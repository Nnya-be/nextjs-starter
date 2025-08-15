import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma } from 'generated/prisma';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { LoggerService } from 'src/logger/logger.service';


@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  private readonly logger = new LoggerService(EmployeesController.name)

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Ip() ip: string, @Query('role') role?: 'INTERN'| 'ENGINEER' | 'ADMIN') {

    this.logger.log( `Request for all Employees\t${ip}`)
    return this.employeesService.findAll(role);
  }

  @Throttle({short: {
    ttl: 100,
    limit: 1
  }})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
