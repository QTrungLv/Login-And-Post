import React from 'react'
import { Card, Row, Col, Badge, Button } from 'react-bootstrap'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'

const ActionButton = ({ url, _id }) => {
    return (
        <>
            <Button className='post-button' href={url} target='_blank'>
                <img src={playIcon} alt='play' width='32' height='32' />
            </Button>
            <Button className='post-button' href={url} target='_blank'>
                <img src={editIcon} alt='edit' width='24' height='24' />
            </Button>
            <Button className='post-button' href={url} target='_blank'>
                <img src={deleteIcon} alt='delete' width='24' height='24' />
            </Button>
        </>

    )
}

export default ActionButton