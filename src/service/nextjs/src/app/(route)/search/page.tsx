'use client';

import { useState } from 'react';
import { Diary } from '@/app/_type';
import { Types } from 'mongoose';
import Header from '@/app/_component/header';
import style from '../../_style/(route)/search/index.module.css';
import SearchBar from './search-bar';
import SearchPageDiary from './diary';

const createMockDiaries = (count: number): Diary[] => {
	const diaries: Diary[] = [];

	for (let i = 0; i < count; i++) {
		const _id = new Types.ObjectId();
		const images = [];
		const imageLength = Math.floor(Math.random() * 5) + 1;
		for (let j = 0; j < imageLength; j++) {
			images.push(`/default-image-0${Math.floor(Math.random() * 10)}.png`);
		}
		const title = 'Title' + (i < 10 ? '0' + i : i);
		const content = ('Content' + (i < 10 ? '0' + i : i)).repeat(Math.floor(Math.random() * 20) + 1);
		const createdAt = new Date();
		const updatedAt = new Date();

		diaries.push({
			_id,
			images,
			title,
			content,
			createdAt,
			updatedAt,
		});
	}
	return diaries;
};

const SearchPage = () => {
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [diaries, setDiaries] = useState<Diary[]>(createMockDiaries(13));

	return (
		<div className={style.container}>
			<Header title="검색" />
			<SearchBar setIsSearching={setIsSearching} />
			<div>
				{isSearching ? (
					<div>검색 중...</div>
				) : (
					<>
						{diaries.map((diary, index) => (
							<SearchPageDiary key={index} {...diary} />
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default SearchPage;
