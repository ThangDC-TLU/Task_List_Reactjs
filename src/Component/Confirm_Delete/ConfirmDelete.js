import './ConfirmDelete.css'
function ConfirmDelete({confirmDelete, confirmCancel}){


    return(
        <div className='box3'>
        <div className='confirm_delete'>
            <p>Are you sure you want to delete this task?</p>
            <div className='btn-confirm_delete'>
                    <button 
                        className='btn-delete'
                        onClick={() => confirmDelete()}
                    >Delete</button>
                    <button 
                        className='btn-cancel'
                        onClick={() => confirmCancel()}
                    >Cancel</button>
            </div>
        </div>
    </div>
    )

}

export default ConfirmDelete;