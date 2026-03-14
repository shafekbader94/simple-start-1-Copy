import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
//import { getRepositoryToken } from '@nestjs/typeorm';
//import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

// Minimal factory for a mock TypeORM repository
const mockUserRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  remove: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let repository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('create()', () => {
    const dto: CreateUserDto = {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
    };

    it('saves and returns a new user', async () => {
      repository.findOneBy.mockResolvedValue(null);
      repository.create.mockReturnValue({ id: 1, ...dto });
      repository.save.mockResolvedValue({ id: 1, ...dto });

      const result = await service.create(dto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('throws ConflictException when email already exists', async () => {
      repository.findOneBy.mockResolvedValue({ id: 99, ...dto });

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });


  describe('findAll()', () => {
    it('returns an array of users', async () => {
      repository.find.mockResolvedValue([{ id: 1 }, { id: 2 }]);
      const result = await service.findAll();
      expect(result).toHaveLength(2);
    });
  });

  describe('findOne()', () => {
    it('returns the user when found', async () => {
      repository.findOneBy.mockResolvedValue({ id: 1 });
      const result = await service.findOne(1);
      expect(result).toEqual({ id: 1 });
    });

    it('throws NotFoundException when user does not exist', async () => {
      repository.findOneBy.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });


  describe('remove()', () => {
    it('removes the user successfully', async () => {
      const user = { id: 1 } as User;
      repository.findOneBy.mockResolvedValue(user);
      repository.remove.mockResolvedValue(undefined);

      await expect(service.remove(1)).resolves.toBeUndefined();
      expect(repository.remove).toHaveBeenCalledWith(user);
    });

    it('throws NotFoundException when user does not exist', async () => {
      repository.findOneBy.mockResolvedValue(null);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
