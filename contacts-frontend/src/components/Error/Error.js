import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import "./Error.css"

function Error() {
    return (
        <div className="error">
            <ReportGmailerrorredIcon className='icon'/>
            <h1>Internal Servor Error</h1>
        </div>
    )
}

export default Error;