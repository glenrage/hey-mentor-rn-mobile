import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import moment from 'moment'
import pluralize from 'pluralize'

pluralize.addPluralRule(/$/i, '\'s ');
pluralize.addPluralRule(/s$/i, 's\' ');

class NotificationsScreen extends Component {
  goBack() {

  }

  dateHeader(curDateObj, prevDateObj) {
    if (prevDateObj && curDateObj.isSame(prevDateObj, 'day')) {
      return null;
    }

    const dateStr = curDateObj.calendar(null, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY'});
    return <Text style={styles.dateHeader}>{ dateStr }</Text>;
  }

  render() {

    // Sample dates
    const yesterday = moment().subtract(5, 'days')
    const twoHoursAgo = moment().subtract(2, 'hours')
    const fiveMinutesAgo = moment().subtract(5, 'minutes')

    const notifications = [
      { time: yesterday, name: "Kevin", text: "University of Washington application is due tomorrow" },
      { time: twoHoursAgo, name: "Chadwick", text: "FAFSA is due in three days" },
      { time: fiveMinutesAgo, text: "College applications are due tomorrow" }
    ];
    const notificationViews = []

    for (let i = 0; i < notifications.length; i++) {
      const curDetails = notifications[i];
      const prevDate = (notifications[i-1] || {}).time

      notificationViews.push(
        <View key={ 'view-' + i }>
          { this.dateHeader(curDetails.time, prevDate) }
          <Notification time={curDetails.time} name={curDetails.name} text={curDetails.text} />
        </View>
      );
    }

    return (
      <View style={styles.view}>
        { notificationViews }
      </View>
    );
  }
}

class Notification extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let nameStr = this.props.name;
    if (nameStr) {
      nameStr = pluralize(nameStr);
    }

    return (
      <View style={styles.card}>
        <Text style={[styles.cardBody, styles.allText]}>
          { nameStr ? <Text style={[styles.name, styles.allText]}>
            {nameStr}
          </Text> : null }
          <Text style={styles.allText}>{this.props.text}</Text>
        </Text>
        <Text style={[styles.allText, styles.time]}>
          {this.props.time.format('hh:mm A')}
        </Text>
      </View>
    );
  }
}

const styles = {
  dateHeader: {
    color: '#a0a0a0',
    marginLeft: 8,
    paddingTop: 24
  },
  time: {
    color: '#1caee5',
    marginRight: 8,
    marginBottom: 4,
    alignSelf: 'flex-end'
  },
  view: {
    marginLeft: 8,
    marginRight: 8
  },
  name: {
    margin: 0,
    fontWeight: 'bold'
  },
  cardBody: {
    paddingRight: 40,
  },
  card: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddf3fb',
    elevation: 1,
    margin: 0,
    marginTop: 8,
    backgroundColor: '#ddf3fb',
    paddingTop: 16,
    paddingLeft: 8,
    width: '100%'
  },
  allText: {
    fontSize: 14,
    lineHeight: 21
  }
};

export default NotificationsScreen;
