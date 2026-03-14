# NestJS Module Generator Prompt (with Database)

Create a NestJS module with controller, service, DTOs, and entity with database integration.

**Module Name:** [MODULE_NAME] (e.g., "Courses", "Classes", "Enrollments")

## Requirements

Generate a complete NestJS module with database integration including:

### 1. Module File
Create `src/[module-name]/[module-name].module.ts`:
- Import and configure TypeORM for the entity
- Register the controller and service
- Export the service for use in other modules

### 2. Service File
Create `src/[module-name]/[module-name].service.ts`:
- Inject TypeORM repository
- Implement CRUD methods:
  - `create()` - Create new record
  - `findAll()` - Return all records ordered by creation date (DESC)
  - `findOne()` - Find by ID or throw NotFoundException
  - `update()` - Update existing record
  - `remove()` - Delete record
- Include proper error handling (NotFoundException, ConflictException)
- Use async/await for database operations

### 3. Controller File
Create `src/[module-name]/[module-name].controller.ts`:
- RESTful endpoints for CRUD operations:
  - POST `/[module-name]` - Create a new record
  - GET `/[module-name]` - Get all records
  - GET `/[module-name]/:id` - Get a single record by ID
  - PATCH `/[module-name]/:id` - Update a record
  - DELETE `/[module-name]/:id` - Delete a record
- Use proper HTTP status codes (201 for creation, 204 for deletion)
- Use ParseIntPipe for ID parameters
- Use DTOs in @Body decorators

### 4. DTOs (Data Transfer Objects)
Create `src/[module-name]/dto/create-[entity-name].dto.ts`:
- Define properties needed for creating a new record
- Include class-validator decorators (@IsString, @IsNotEmpty, @IsOptional, @IsInt, @IsPositive, @MinLength, @MaxLength, etc.)
- Add appropriate validation rules

Create `src/[module-name]/dto/update-[entity-name].dto.ts`:
- Make all properties optional (@IsOptional)
- Include same validation decorators as create DTO
- Allow partial updates

### 5. Entity File
Create `src/[module-name]/entities/[entity-name].entity.ts`:
- Use TypeORM decorators (@Entity, @PrimaryGeneratedColumn, @Column)
- Include standard fields:
  - `id` - Auto-generated primary key
  - Add domain-specific fields based on the module purpose
  - `createdAt` - @CreateDateColumn
  - `updatedAt` - @UpdateDateColumn
- Add appropriate column constraints (unique, nullable, default values)

## Naming Conventions

- **File names:** Use kebab-case (e.g., `courses.controller.ts`, `create-course.dto.ts`)
- **Class names:** Use PascalCase (e.g., `CoursesController`, `CreateCourseDto`, `Course`)
- **Folder structure:**
  ```
  src/
    [module-name]/
      [module-name].module.ts
      [module-name].controller.ts
      [module-name].service.ts
      dto/
        create-[entity-name].dto.ts
        update-[entity-name].dto.ts
      entities/
        [entity-name].entity.ts
  ```

## Example Usage

**Input:** "Create a Courses module following the newModule.md template"

**Expected Output:** Complete module with:
- `src/courses/courses.module.ts`
- `src/courses/courses.controller.ts`
- `src/courses/courses.service.ts`
- `src/courses/dto/create-course.dto.ts`
- `src/courses/dto/update-course.dto.ts`
- `src/courses/entities/course.entity.ts`

## Additional Notes

- Follow the same pattern as the existing modules in this project
- Use proper TypeScript typing
- Include all necessary imports from @nestjs/common, @nestjs/typeorm, class-validator, and typeorm
- Ensure consistent code formatting and style
- Add appropriate error messages in exceptions
- Use async/await for database operations
- Return proper types (Promise<Entity>, Promise<Entity[]>, Promise<void>)
