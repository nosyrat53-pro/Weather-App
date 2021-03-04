import React , {Component} from 'react' ;
import './ShowData.css';
import { WiDayStormShowers } from 'react-icons/wi' ; // 1
import { FaCloudShowersHeavy } from 'react-icons/fa' ; // 2
import { FaCloudSunRain } from "react-icons/fa"; // 3
import {FaSnowflake} from 'react-icons/fa' ; // 4
import { WiDayFog } from 'react-icons/wi' ; // 5
import {WiDaySunny} from 'react-icons/wi'; // 6
import { WiDayCloudy } from 'react-icons/wi';// 7



const returnIcon = (id) => {
    if(id >= 200 && id<= 232){
        return(
             <WiDayStormShowers />
         )
    }else if(id >= 300 && id <= 321){
        return(
            <FaCloudShowersHeavy />
        )
    }else if(id >= 500 && id <= 531){
        return(
            <WiDayCloudy />
        )
    }else if(id >= 600 && id <= 622){
        return(
            <FaSnowflake />
        )
    }else if(id >= 701 && id <= 781){
        return(
            <WiDayFog />
        )
    }else if(id == 800){
        return(
            <WiDaySunny />
        )
    }else if(id >= 801 && id <= 804){
        return(
            <WiDayCloudy />
        )
    }
}

const getDays = () => {

    const date = new Date() ;

    const dayNames = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

    // fill days with valus
    const days = [date.getDay() , date.getDay()+1 , date.getDay()+2, date.getDay()+3, date.getDay()+4, date.getDay()+5];

    const realyDays = [] ;
    
    // fill realydays array with correct values
    days.forEach(element => {
        if(element > 6){
            realyDays.push(element-7)
        }else{
            realyDays.push(element)
        }
    });

    // return what i need 
    return{
        today: dayNames[realyDays[0]],
        day_1: dayNames[realyDays[1]],
        day_2: dayNames[realyDays[2]],
        day_3: dayNames[realyDays[3]],
        day_4: dayNames[realyDays[4]],
        day_5: dayNames[realyDays[5]]
    }

}

const getMonthName= () => {
    const Months = ['jan','feb','mar','apr','may' , 'jun','jul','aug','sep','oct','nov','dec'];

    return Months[new Date().getMonth()] ;
}

const Day = (props) => {

    return(
        <div className="day">
        <div className="icon">
            {returnIcon(props.icon_id)}
            <div>{props.desc}</div>
        </div>
        
        <div className="name">
            <h2>{props.day}</h2>
        </div>

        <div className="degree">
        <div className="temp">temp ({props.temp}&deg;C)</div>
        <div className="wind">wind ({props.wind} Km)</div>
        </div>

    </div>
    )
}

const Today = (props) => {
    // console.log(props.infos)

    return(
        <div className="tody">

        <div className="icon">
            
            {returnIcon(props.infos.weather[0].id)}
            <div className="desc">{props.infos.weather[0].description}</div>

        </div>

        <div className="date">
            <h1 className="tody-name">{props.day}</h1>
            <h1>{getMonthName() + " " + String(new Date().getDate()).padStart(2, '0')} </h1>
        </div>

        <div className="weather-info">
            <div>temp ({Math.floor(props.infos.main.temp-273.15)}&deg;C)</div>
            <div>HUMIDITY ({props.infos.main.humidity}%)</div>
            <div>Wind ({Math.floor(props.infos.wind.speed)} km)</div>
        </div>

    </div>
    )
}

class ShowData extends React.Component {


    render(){

        const alldays = getDays() ;
        


        if(this.props.informations.message != "city not found" && this.props.fullInformatinos.message == 0){


            console.log(this.props.fullInformatinos)
            // Get the first element of the list and store its date value to compare it with next elements
            let todayDate = this.props.fullInformatinos.list[0].dt_txt.slice(9,10);

                // console.log(this.props.fullInformatinos.list[0].dt_txt);

            let index_of_begin_each_next_day = [] ;

            for(let i = 0 ; i < this.props.fullInformatinos.list.length ; i++){

                let temp = this.props.fullInformatinos.list[i].dt_txt.slice(9,10);

                    // console.log(todayDate , temp)

                if( temp != todayDate){
              
                    index_of_begin_each_next_day.push(i) ;

                    todayDate = temp ;

                }

            }

            // console.log(index_of_begin_each_next_day)

            // console.log(this.props.fullInformatinos.list)
              
            const info = this.props.fullInformatinos ;
            
            return(

                <div className="container">

                    <Today day={alldays.today} infos={this.props.informations} />

                    <div className="other-days">

                        <Day 
                        day={alldays.day_1} 
                        icon_id={info.list[index_of_begin_each_next_day[0]+4].weather[0].id}
                        temp={Math.floor(info.list[index_of_begin_each_next_day[0]+4].main.temp -273.15)}
                        wind={Math.floor(info.list[index_of_begin_each_next_day[0]+4].wind.speed)}
                        desc={info.list[index_of_begin_each_next_day[0]+4].weather[0].description}
                        />

                        <Day day={alldays.day_2} 
                        icon_id={info.list[index_of_begin_each_next_day[1]+4].weather[0].id}
                        temp={Math.floor(info.list[index_of_begin_each_next_day[1]+4].main.temp -273.15)}
                        wind={Math.floor(info.list[index_of_begin_each_next_day[1]+4].wind.speed)}
                        desc={info.list[index_of_begin_each_next_day[1]+4].weather[0].description}
                        />

                        <Day day={alldays.day_3}
                        icon_id={info.list[index_of_begin_each_next_day[2]+4].weather[0].id}
                        temp={Math.floor(info.list[index_of_begin_each_next_day[2]+4].main.temp -273.15)}
                        wind={Math.floor(info.list[index_of_begin_each_next_day[2]+4].wind.speed)}
                        desc={info.list[index_of_begin_each_next_day[2]+4].weather[0].description}
                        />

                        <Day day={alldays.day_4}
                        icon_id={info.list[index_of_begin_each_next_day[3]+4].weather[0].id}
                        temp={Math.floor(info.list[index_of_begin_each_next_day[3]+4].main.temp -273.15)}
                        wind={Math.floor(info.list[index_of_begin_each_next_day[3]+4].wind.speed)}
                        desc={info.list[index_of_begin_each_next_day[3]+4].weather[0].description}
                        />
                        {/* <Day day={alldays.day_5}/> */}

                    </div>

                </div>
            )

        }else{
            return <h1 className="error">City Name Is Error</h1> ;
        }

    }

    // componentDidUpdate(){
    //     console.log(this.props.informations)
    // }

}



export default ShowData ;



