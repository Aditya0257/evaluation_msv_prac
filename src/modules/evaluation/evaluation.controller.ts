import { Body, Controller, Post } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  async evaluateAnswer(
    @Body() body: { attendee_id: string; ques_id: string; answer: string },
  ) {
    const { attendee_id, ques_id, answer } = body;
    return await this.evaluationService.evaluateAnswer(
      attendee_id,
      ques_id,
      answer,
    );
  }
}
