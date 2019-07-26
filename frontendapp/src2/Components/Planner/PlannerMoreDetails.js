import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-elements'
import JitsiCallButton from '../../Components/Buttons/JitsiCallButton'

// Attn CJ: Data required here is the appointment object of that specific user
const test_appointment =
{
	"appointment_date_time": "2019-08-21 21:30:00",
	"doctor_name": "Dr. Andrea Pirlo",
	"patient_name": "Diego Costa",
	"jitsi_key": 'ssss'
}

// Attn CJ: Data required here is the specific user object
const test_user =
{
	"user_type": "Psychiatrist"
}

export default class PlannerMoreDetails extends Component {

	constructor() {
		super()
		this.state = {
			appointment: test_appointment,
			userType: test_user
		}
	}

	componentDidMount() {
		this.setState({
			appointment: this.props.navigation.state.params.appointmentObj,
			userType: this.props.navigation.state.params.userType
		})
	}

	render() {
		if (this.state.userType == "Patient") {
			return (
				<View>
					<Text h4>{this.state.appointment.appointment_date_time}</Text>
					<Text h4>{this.state.appointment.doctor_name}</Text>
					<Text>{'\n'}</Text>
					<JitsiCallButton jitsi_key={this.state.appointment.jitsy_key} />
					<Button
						containerStyle={styles.buttonContainer}
						title='Join Call' />
					<Text>{'\n'}</Text>
					<Button
						containerStyle={styles.buttonContainer}
						title='Cancel Appointment' />
				</View>
			)
		} else {
			return (
				<View>
					<Text h4>{this.state.appointment.appointment_date_time}</Text>
					<Text h4>{this.state.appointment.patient_name}</Text>
					<JitsiCallButton jitsi_key={this.state.appointment.jitsi_key} />
					<Button
						containerStyle={styles.buttonContainer}
						title='Join Call' />
					<Text>{'\n'}</Text>
					<Button
						containerStyle={styles.buttonContainer}
						title='Cancel Appointment' />
					<Text>{'\n'}</Text>
					<Button
						containerStyle={styles.buttonContainer}
						title='Treatment Plan of Patient' />
					<Text>{'\n'}</Text>
					<Button
						containerStyle={styles.buttonContainer}
						title='Create Appointment Log' />
					<Text>{'\n'}</Text>
					<Button
						containerStyle={styles.buttonContainer}
						title='Schedule Next Appointment' />
				</View>
			)
		}

	}
}

const styles = StyleSheet.create({
	buttonContainer: {
		width: 275,
		marginHorizontal: 75
	}
})