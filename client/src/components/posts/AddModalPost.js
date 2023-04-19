
import { Form, Button, Modal } from 'react-bootstrap'

const AddModalPost = () => {
    return (
        <Modal show={true} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                    What do you want to learn?
                </Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Title' name='title' required aria-describedby='title-help' />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as='textarea' rows='3' placeholder='Description' name='description' required aria-describedby='title-help' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Youtuber Tutorial URl' name='url' />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' >Cancel</Button>
                    <Button variants='primary' type='submit'>LearnIt!</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddModalPost