import React, {useMemo} from 'react'
import './musiclistitem.scss'

export default function MusicListItem(props) {
    const {
        musicItem,
        currentMusicItem,
        playMusicHandler,
        deleteMusicHandler
    } = props;

    const focus = useMemo(() => {
        console.log(musicItem.id, currentMusicItem.id);
        return musicItem.id === currentMusicItem.id;
    }, [currentMusicItem]);

    const playMusic = () => {
        playMusicHandler(musicItem);
    };
    const deleteMusic = (e) => {
        e && e.stopPropagation();
        deleteMusicHandler(musicItem);
    };
    return (
        <li onClick={playMusic}
            className={`components-listitem row ${focus ? 'focus' : ''}`}>
            <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
            <p onClick={deleteMusic} className="-col-auto delete"></p>
        </li>
    )
}
