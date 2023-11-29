import classes from './loader.module.css'

const Loader = (props) => {
    return (
        <div className={classes.loader}
            style={props.style}>

        </div>
    )
}

export default Loader