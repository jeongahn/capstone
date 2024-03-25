import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

const diarySchemaOptions: SchemaOptions = {
	autoCreate: true,
	timestamps: true,
	collection: 'diaries',
	toJSON: {
		transform: (doc, ret) => {
			delete ret.__v;
			return ret;
		},
	},
};

@Schema(diarySchemaOptions)
export class Diary {
	//One-to-Squillions
	@Prop({ type: String, required: true })
	@ApiProperty({
		type: String,
		description: 'User ID',
		example: '49fafa4d2ca3602935816679',
	})
	userId: string;

	@Prop({ type: String, required: true })
	@ApiProperty({
		type: String,
		description: 'Title',
		example: 'Today diary',
	})
	title: string;

	@Prop({ type: String, required: true })
	@ApiProperty({
		type: String,
		description: 'Content',
		example: 'Today diary content',
	})
	content: string;
}

export const DiarySchema = SchemaFactory.createForClass(Diary);

export type DiaryDocument = Diary & Document;
