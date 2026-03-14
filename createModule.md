# NestJS Module Generator Prompt

Create a complete NestJS module with the following specifications:

**Module Name:** [MODULE_NAME] (e.g., "Products", "Orders", "Categories")

## Requirements

Generate a fully functional NestJS module with CRUD operations including:

### 1. Module File
Create `src/[module-name]/[module-name].module.ts`:
- Import and configure TypeORM for the entity
- Register the controller and service
- Export the service for use in other modules

### 2. Controller File
Create `src/[module-name]/[module-name].controller.ts`:
- RESTful endpoints for CRUD operations:
  - POST `/[module-name]` - Create a new record
  - GET `/[module-name]` - Get all records
  - GET `/[module-name]/:id` - Get a single record by ID
  - PATCH `/[module-name]/:id` - Update a record
  - DELETE `/[module-name]/:id` - Delete a record
- Use proper HTTP status codes (201 for creation, 204 for deletion)
- Use ParseIntPipe for ID parameters
- Use appropriate decorators (@Body, @Param, @Get, @Post, @Patch, @Delete)

### 3. Service File
Create `src/[module-name]/[module-name].service.ts`:
- Inject TypeORM repository
- Implement CRUD methods:
  - `create()` - Create new record with duplicate checking
  - `findAll()` - Return all records ordered by creation date (DESC)
  - `findOne()` - Find by ID or throw NotFoundException
  - `update()` - Update existing record with validation
  - `remove()` - Delete record
- Include proper error handling (NotFoundException, ConflictException)

### 4. DTOs (Data Transfer Objects)
Create `src/[module-name]/dto/create-[entity-name].dto.ts`:
- Define properties needed for creating a new record
- Include class-validator decorators (@IsString, @IsNotEmpty, @IsOptional, @IsEmail, @IsInt, @IsPositive, @MinLength, @MaxLength, etc.)
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

- **File names:** Use kebab-case (e.g., `products.controller.ts`, `create-product.dto.ts`)
- **Class names:** Use PascalCase (e.g., `ProductsController`, `CreateProductDto`, `Product`)
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

**Input:** "Create a Products module"

**Expected Output:** Complete module with:
- `src/products/products.module.ts`
- `src/products/products.controller.ts`
- `src/products/products.service.ts`
- `src/products/dto/create-product.dto.ts`
- `src/products/dto/update-product.dto.ts`
- `src/products/entities/product.entity.ts`

For Products module, include fields like:
- `name` (string, required, 1-200 characters)
- `description` (string, optional)
- `price` (number, required, positive)
- `stock` (number, required, non-negative integer)
- `category` (string, optional)
- `isAvailable` (boolean, default: true)

## Additional Notes

- Follow the same pattern as the existing Users module in this project
- Use proper TypeScript typing
- Include all necessary imports from @nestjs/common, @nestjs/typeorm, class-validator, and typeorm
- Ensure consistent code formatting and style
- Add appropriate error messages in exceptions
- Use async/await for database operations
- Return proper types (Promise<Entity>, Promise<Entity[]>, Promise<void>)
