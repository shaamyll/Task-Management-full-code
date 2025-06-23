import {  IsString } from "class-validator";

export class createTaskDTO {

@IsString()
title: string;

@IsString()
description: string;


}
