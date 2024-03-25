import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Diary } from 'src/common/database/schema';
import { Types } from 'mongoose';

@Injectable()
class DiaryService {
	constructor(@InjectModel('Diary') private readonly diaryModel) {}

	async get(diaryId: string) {
		try {
			return await this.diaryModel.findById(diaryId);
		} catch (error) {
			throw error;
		}
	}

	async getUser(userId: Types.ObjectId) {
		try {
			return await this.diaryModel.find({ userId: userId });
		} catch (error) {
			throw error;
		}
	}

	async create(userId: Types.ObjectId, title: string, content: string) {
		try {
			return await new this.diaryModel({ userId, title, content }).save();
		} catch (error) {
			throw error;
		}
	}

	async update(diaryId: string, title: string, content: string) {
		try {
			return await this.diaryModel.findByIdAndUpdate(diaryId, { title, content }, { new: true });
		} catch (error) {
			throw error;
		}
	}

	async delete(diaryId: string) {
		try {
			return await this.diaryModel.findByIdAndDelete(diaryId);
		} catch (error) {
			throw error;
		}
	}
}

export default DiaryService;
