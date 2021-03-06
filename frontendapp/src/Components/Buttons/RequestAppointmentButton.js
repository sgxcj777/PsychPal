import React, { Component } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Button } from 'react-native-elements'
import DateTimePicker from "react-native-modal-datetime-picker";
import connection from '../../../DatabaseInteraction/Connection'

// to create appointment and store in database
//required props: doctorName, patientName, doctorAccept (1 if doctor create 0 if patient create)
export default class RequestAppointment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDateTimePickerVisible: false,
            selectedDateDisplay: ""
        };
    }
    
	showDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: true });
	};

	hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
	};

	handleDatePicked = date => {
        const dateCreate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
        this.setState({ 
            selectedDateDisplay: "Submitted appointment request for \n" + date.toLocaleString(),
        });
        this.createAppointment(dateCreate)
		this.hideDateTimePicker();
    };
    
    createAppointment = (dateSelected) => {
        // console.log(dateSelected);
        url = 'http://' + connection.connection + ':3005/insert into appointment_details values(\'' + 
        this.props.patientName + '\', \'' + 
        this.props.doctorName + '\',null,' + '\'' + dateSelected  + '\''+ 
        ', "testkey", null,' + this.props.doctorAccept + ',0,null);'
        fetch(url)
    }

	render() {

		return (
			<View style={styles.container}>
				{this.state.selectedDateDisplay == "" ?
                    <Button
                    type='outline'
                    containerStyle = {styles.buttonContainer} 
                    title="Request for an Appointment" 
                    onPress={this.showDateTimePicker} />
                :
                    
				    <Text style={styles.text}>{this.state.selectedDateDisplay}</Text>
                }
				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this.handleDatePicked}
					onCancel={this.hideDateTimePicker}
					mode='datetime' />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
        marginTop: 0,
	},
	text: {
		fontSize: 22,
		marginVertical: 10
    },
    buttonContainer: {
        width: 275,
        marginTop: 25,
        alignContent: 'center',
    },
});