
import { IsDateString, IsOptional, IsString } from "class-validator";

export class createTaskDTO {

    @IsString()
    title: string;

    @IsString()
    description: string;


    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsString()
    status?: string;

}


export interface taskFilters {
  searchTitle?: string;
  filterStatus?: string;
  filterStartDate?: string;
  filterEndDate?:string
}
