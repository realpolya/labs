import './Item.css';
import { useParams } from 'react-router-dom';

function Item({ mailboxes }) {
    
    // extract id from url
    const { id } = useParams();

    // find mailbox
    const mailbox = mailboxes.find(mailbox => Number(id) === Number(mailbox._id));
    
    return (
        <main id="item-main">
            <div id="mailbox-item">
                <h2>Mailbox {mailbox._id}</h2>
                <p><span>Boxholder:</span> {mailbox.boxholder}</p>
                <p><span>Box size:</span> {mailbox.boxSize}</p>
            </div>
            <div id="letters-item">
                <h3>Letters to {mailbox.boxholder}</h3>
                {mailbox.letters.map(letter => {
                    return <p className='letter-text'>{letter}</p>
                })}
            </div>
        </main>
  )
}

export default Item