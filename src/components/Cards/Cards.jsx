import React from 'react';
import { Card, Container, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import cx from 'classnames';
import Loader from '../Loader/Loader';

const useStyles = makeStyles({
    card_wrapper: { 
        width: '100%',
        borderRadius: 'none',
    },
    
})
 
const Cards = ({data: {confirmed, recovered, deaths, lastUpdate }}) => {
    const classes = useStyles();

    if(!confirmed){
        return (
            <Loader />
        )
    }

    const recovery_rate = (recovered.value/confirmed.value*100)
    const death_rate = (deaths.value/confirmed.value*100)

    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <Container className={classes.card_wrapper}>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography varient="h5" color="primary">
                            <CountUp
                                start={0}
                                end={confirmed.value}
                                duration={2.5}
                                seperator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    </Container>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <Container>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography varient="h5" className="text-success">
                            <CountUp
                                start={0}
                                end={recovered.value}
                                duration={2.5}
                                seperator=","
                            />
                        </Typography>                       
                        <Typography color="textSecondary" gutterBottom>Recovery Rate</Typography>
                        <Typography varient="h4" className="text-success">                            
                            <CountUp
                                start={0}
                                end={recovery_rate}
                                duration={2.5}
                                decimals={3}
                            />%
                        </Typography>                        
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    </Container>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <Container>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography varient="h5" color="error">
                            <CountUp
                                start={0}
                                end={deaths.value}
                                duration={2.0}
                                seperator=","
                            />
                        </Typography>                       
                        <Typography color="textSecondary" gutterBottom>Death Rate</Typography>
                        <Typography varient="h4" color="error">                            
                            <CountUp
                                start={0}
                                end={death_rate}
                                duration={2.5}
                                decimals={3}
                            />%
                        </Typography>                        
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    </Container>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards