import { Controller } from '@nestjs/common';
import { ViolationsService } from './violations.service';

@Controller('violations')
export class ViolationsController {
  constructor(private readonly violationsService: ViolationsService) {}

  @

}
