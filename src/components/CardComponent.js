import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import { green } from '@mui/material/colors';
// import { MdExpandMore, MdFavorite, MdMoreVert, MdShare } from 'react-icons/md';
import { GrCircleInformation } from 'react-icons/gr';
import defaultImg from '../images/img.png';
import { Tooltip } from '@mui/material';

// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));

export default function CardComponent() {
    // const [expanded, setExpanded] = React.useState(false);

    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // };

    return (
        <Card sx={{
            width: 180, boxShadow: "none", borderRadius: "100px",
            p: "8px 8px 0px", cursor: "pointer"
        }}>
            <CardMedia
                component="img"
                height="180"
                image={defaultImg ? defaultImg : defaultImg}
                sx={{ border: "1px solid green", borderRadius: "50%" }}
                alt="teacher name"
            />
            {/* <Divider /> */}
            <CardContent>
                <Typography variant="body2" color="green">
                    <b>
                        Teacher Name
                    </b>
                </Typography>
                <Typography variant="body2" color="green">
                    teacher1@gmail.com
                </Typography>
                <Tooltip title="View User" arrow>
                    <IconButton aria-label="View User" sx={{
                        position: "relative", left: "115px",
                        bottom: "67px"
                    }}>
                        <GrCircleInformation />
                    </IconButton>
                </Tooltip>
            </CardContent>
        </Card>
    );
}
