import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { GetUser } from 'src/auth/decorators/get-current-user.decorator';
import UserModel from 'src/users/models/user.model';
import FindOneParams from 'src/utils/find_one_params';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('subscribers')
@ApiTags('Subscribers')
@UseGuards(JwtAuthGuard)
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post('subscribe')
  async subscribe(
    @GetUser() user: UserModel,
    @Body() { id }: FindOneParams,
    @Res() res: Response,
  ) {
    await this.subscribersService.subscribe(id, user.id);
    return res.status(200).json({
      success: true,
      message: 'Subscribed successfully.',
    });
  }
  @Post('unsubscribe')
  async unSubscribe(
    @GetUser() user: UserModel,
    @Body() { id }: FindOneParams,
    @Res() res: Response,
  ) {
    await this.subscribersService.unsubscribe(id, user.id);
    return res.status(200).json({
      success: true,
      message: 'UnSubscribed successfully.',
    });
  }
  @Get('all')
  async getAllSubscribers(@GetUser() user: UserModel, @Res() res: Response) {
    const response = await this.subscribersService.getAllSubscribersForUser(
      user.id,
    );
    return res.status(200).json({
      success: true,
      message: 'Successfully fetched all subscribers.',
      data: {
        count: response,
      },
    });
  }
}
