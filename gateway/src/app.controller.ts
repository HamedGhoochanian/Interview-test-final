import {
    Body,
    Controller,
    Delete, Get, NotFoundException,
    Param,
    Post,
    Put
} from "@nestjs/common";
import {UserService, PostService} from "./app.service";
import {User, PostType} from "./app.types";
import {IdValidator, NameValidator, PostValidator, UpdatePostValidator} from "./app.validators";

@Controller("people")
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get(":id")
    async getPerson(@Param() params: IdValidator): Promise<User> {
        const user = await this.userService.get(params.id);
        if (user === null)
            throw new NotFoundException();
        return user;
    }

    @Get()
    async getPeople(): Promise<User[]> {
        return await this.userService.list();
    }

    @Delete(":id")
    async deletePerson(@Param() params: IdValidator): Promise<any> {
        const result = await this.userService.delete(params.id);
        if (result === false) throw new NotFoundException();
        return {message: "Resource Deleted."};
    }

    @Post()
    async addPerson(@Body() body: NameValidator): Promise<any> {
        await this.userService.create(body.name);
        return {message: "Resource created."};
    }

    @Put(":id")
    async updatePerson(@Param() params: IdValidator, @Body() body: NameValidator): Promise<any> {
        const result = this.userService.update(params.id, body.name);
        if (result === null) throw new NotFoundException();
        return result;
    }
}

@Controller("posts")
export class PostController {
    constructor(private readonly postService: PostService) {
    }


    @Get(":id")
    async getPerson(@Param() params: IdValidator): Promise<PostType> {
        const post = this.postService.get(params.id);
        if (post === null)
            throw new NotFoundException();
        return post;
    }

    @Get()
    async getPeople(): Promise<PostType[]> {
        return await this.postService.list();
    }

    @Delete(":id")
    async deletePerson(@Param() params: IdValidator): Promise<any> {
        const result = await this.postService.delete(params.id);
        if (result === false) throw new NotFoundException();
        return {message: "Resource Deleted."};
    }

    @Post()
    async addPerson(@Body() body: PostValidator): Promise<PostType> {
        const post = await this.postService.create(body.title, body.content, body.author);
        if (post === null) {
            throw new NotFoundException(null, "invalid author");
        }
        return post;
    }


    @Put(":id")
    updatePerson(@Param() params: IdValidator, @Body() body: UpdatePostValidator): any {
        const result = this.postService.update(params.id, {
            title: body.title,
            content: body.content,
            author: body.author
        });
        if (result === null) throw new NotFoundException();
        return result;
    }
}
