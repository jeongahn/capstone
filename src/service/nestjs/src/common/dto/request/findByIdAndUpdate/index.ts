import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ObjectId, QueryOptions, ReturnsNewDoc, UpdateQuery } from 'mongoose';

export class FindByIdAndUpdate<TRawDocType> {
	@IsOptional()
	@ApiProperty({ description: 'id', example: '60f9a8f7d1f9d9a7d1f9d9a7' })
	id?: ObjectId | any;

	@IsOptional()
	@ApiProperty({ description: 'update', example: { title: 'new title' } })
	update?: UpdateQuery<TRawDocType>;

	@IsOptional()
	@ApiProperty()
	options?:
		| (QueryOptions<TRawDocType> & { lean: true })
		| (QueryOptions<TRawDocType> & { includeResultMetadata: true })
		| (QueryOptions<TRawDocType> & { upsert: true } & ReturnsNewDoc)
		| QueryOptions<TRawDocType>
		| null;
}
