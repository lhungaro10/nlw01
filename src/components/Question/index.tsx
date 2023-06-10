import { ReactNode } from 'react';
import './styles.scss';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar?: string;
    };
    children?: ReactNode;

}

export function Question({
    content,
    author,
    children,
}: QuestionProps) {
    console.log(author.avatar);
    return(
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}