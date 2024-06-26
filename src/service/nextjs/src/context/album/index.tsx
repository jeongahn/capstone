'use client';

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import AuthContext from '../auth';
import { Album } from '@/type';
import { getAlbums } from '@/service';

const AlbumContext = createContext<{
	albums: Album[];
	setAlbums: Dispatch<SetStateAction<Album[]>>;
}>({
	albums: [],
	setAlbums: () => {},
});

export const AlbumProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const { me } = useContext(AuthContext);
	const [albums, setAlbums] = useState<Album[]>([]);

	useEffect(() => {
		if (me) {
			getAlbums()
				.then((response: Album[]) => {
					setAlbums(response);
				})
				.catch((error: Error) => {
					setAlbums([]);
				});
		}
	}, [me]);

	return <AlbumContext.Provider value={{ albums, setAlbums }}>{children}</AlbumContext.Provider>;
};

export default AlbumContext;
