import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class UploadImage {
	@IsNotEmpty()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Connection id' })
	connectionId: string;

	@IsNotEmpty()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Image url to upload' })
	url: string;
}

export default UploadImage;
