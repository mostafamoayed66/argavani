import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import logo from '../../images/notFound.png';

const Postempty = () => {
    return (
        <div dir="rtl">
            <Card className="notFound">
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Nothing found in price filter"
                        height="200"
                        image={logo}
                        title="Nothing found in price filter"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">کالای ناموجود</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            متاسفانه کالایی برای ارائه به شما مشتری خوب یافت نشده است.
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}
export default Postempty;
