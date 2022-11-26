import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAdminAuthGuard } from '../modules/auth/gql-admin-auth.guard';
import { Category } from './models/category.model';
import { CategoryService } from '../modules/book/category.service';
import { CategorySearchInput } from './inputs/category-search.input';
import { CategoryCreateInput } from './inputs/category-create.input';
import { CategoryUpdateInput } from './inputs/category-update.input';

@Resolver(of => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}
  @Query(returns => [Category])
  async categories(@Args('input') input: CategorySearchInput): Promise<Category[]> {
    return this.categoryService.findCategories(input);
  }

  @Mutation(returns => Category)
  @UseGuards(GqlAdminAuthGuard)
  createCategory(@Args('input') input: CategoryCreateInput): Promise<Category> {
    return this.categoryService.create(input);
  }

  @Mutation(returns => Category)
  @UseGuards(GqlAdminAuthGuard)
  updateCategory(@Args('input') input: CategoryUpdateInput): Promise<Category> {
    return this.categoryService.update(input);
  }
}
