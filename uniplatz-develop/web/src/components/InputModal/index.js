import React, { Component } from 'react';
import { Button, Modal, Header, Icon, Input } from 'semantic-ui-react';
import './index.css';

class InputModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
        };
    }

    render() {
        return (
            <Modal id="input-modal" open={this.props.active} size="tiny">
                <Header icon="privacy" content={this.props.title} />
                <Modal.Content>
                    <p>{this.props.text}</p>
                    <Input
                        id="input-modal-input"
                        fluid
                        type={this.props.isPassword ? 'password' : 'text'}
                        icon={this.props.inputIcon}
                        iconPosition="left"
                        placeholder={this.props.inputPlaceholder}
                        value={this.state.input}
                        onChange={e => this.setState({ input: e.target.value })}
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        basic
                        onClick={this.props.onClose}>
                        <Icon name="remove" /> No
                    </Button>
                    <Button
                        color="black"
                        onClick={() => this.props.onSave(this.state.input)}
                    >
                        <Icon name="checkmark" /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default InputModal;
