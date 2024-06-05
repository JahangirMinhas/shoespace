import Paper from '@mui/material/Paper'

function Item({item})
{
    return (
        <Paper>
            <img src={item.src} alt={item.title} style={{width: "1400px", height: "550px"}} />
        </Paper>
    )
}

export default Item