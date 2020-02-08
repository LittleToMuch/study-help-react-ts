import React, {Component} from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IKonowledgeProps extends RouteComponentProps{}

class Knowledge extends Component<IKonowledgeProps> {
    
    render() {
        setTimeout(() => {
            console.log(2);
        }, 2000)
        return (
            <div>
                Knowledgeasldjaldlkasdkasdklnzxlkcjasld
            </div>
        );
    }
}

export default Knowledge;