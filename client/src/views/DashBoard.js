import React, { useContext, useEffect } from 'react'
import { PostContext } from '../contexts/PostContext'
import { Spinner, Card, Button, Row, Col } from 'react-bootstrap'
import { AuthContext } from '../contexts/AuthContext'
import SinglePost from '../components/posts/SinglePost'
import AddModalPost from '../components/posts/AddModalPost'
const DashBoard = () => {

    const { authState: { user: { username } } } = useContext(AuthContext)

    const { postState: { posts, postsLoading }, getPosts } = useContext(PostContext)

    useEffect(() => getPosts(), [])

    let body = null

    if (postsLoading) {
        body = (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to LearnIt</Card.Title>
                        <Card.Text>
                            Click the button below to track your first skill to learn
                        </Card.Text>
                        <Button variant='primary'>
                            LearnIt!
                        </Button>
                    </Card.Body>
                </Card>
            </>
        )
    } else {
        body = (
            <>
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                    {posts.map(post => (
                        <Col key={post._id} className='my-2'>
                            <SinglePost post={post} />
                        </Col>
                    ))}
                </Row>
            </>
        )

    }

    return (
        <>
            {body}
            <AddModalPost />
        </>
    )
}

export default DashBoard