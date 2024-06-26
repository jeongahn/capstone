import { Injectable } from '@nestjs/common';
import { AxiosResponse, AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import * as Dto from './dto';

@Injectable()
class MysticService {
	constructor(private readonly httpService: HttpService) {}

	async connect(connectRequestDto: Dto.Request.Connect): Promise<Dto.Response.Connect> {
		try {
			const { version, templateId } = connectRequestDto;

			return await lastValueFrom(
				this.httpService
					.post<Dto.Response.Connect>('/connect', { version, template_id: templateId })
					.pipe(
						map((response: AxiosResponse<Dto.Response.Connect>) => {
							return response.data;
						}),
						catchError((error: AxiosError) => {
							throw error;
						}),
					),
			);
		} catch (error) {
			throw error;
		}
	}

	async uploadImage(uploadImageRequestDto: Dto.Request.UploadImage): Promise<any> {
		try {
			const { connectionId, url } = uploadImageRequestDto;

			return await lastValueFrom(
				this.httpService
					.post<Dto.Response.UploadImage>('/image/upload', {
						connection_id: connectionId,
						url,
					})
					.pipe(
						map((response: AxiosResponse<Dto.Response.UploadImage>) => {
							return response.data;
						}),
						catchError((error: AxiosError) => {
							throw error;
						}),
					),
			);
		} catch (error) {
			throw error;
		}
	}

	async stt(connectionId: string, audio_data: any, type: string): Promise<any> {
		try {
			return await lastValueFrom(
				this.httpService.post<any>('/stt', { connection_id: connectionId, audio_data, type }).pipe(
					map((response: AxiosResponse<any>) => {
						return response.data;
					}),
					catchError((error: AxiosError) => {
						throw error;
					}),
				),
			);
		} catch (error) {
			throw error;
		}
	}

	async invoke(connectionId: string, content: string): Promise<any> {
		try {
			return await lastValueFrom(
				this.httpService.post<any>('/chat/invoke', { connection_id: connectionId, content }).pipe(
					map((response: AxiosResponse<any>) => {
						return response.data;
					}),
					catchError((error: AxiosError) => {
						throw error;
					}),
				),
			);
		} catch (error) {
			throw error;
		}
	}

	async tts(text: string, speaker: string): Promise<string> {
		try {
			return await lastValueFrom(
				this.httpService.post<string>('/tts', { text, speaker }).pipe(
					map((response: AxiosResponse<string>) => {
						return response.data;
					}),
					catchError((error: AxiosError) => {
						throw error;
					}),
				),
			);
		} catch (error) {
			throw error;
		}
	}

	async summary(connectionId: string): Promise<string> {
		try {
			return await lastValueFrom(
				this.httpService.post<string>('/chat/summary', { connection_id: connectionId }).pipe(
					map((response: AxiosResponse<string>) => {
						return response.data;
					}),
					catchError((error: AxiosError) => {
						throw error;
					}),
				),
			);
		} catch (error) {
			throw error;
		}
	}

	async disconnect(connectionId: string): Promise<string> {
		try {
			return await lastValueFrom(
				this.httpService.post<string>('/disconnect', { connection_id: connectionId }).pipe(
					map((response: AxiosResponse<string>) => {
						return response.data;
					}),
					catchError((error: AxiosError) => {
						throw error;
					}),
				),
			);
		} catch (error) {
			throw error;
		}
	}
}

export default MysticService;
