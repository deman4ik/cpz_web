// import React from 'react';
// import { Text, View } from 'react-native';
// import { IconButton } from 'react-native-paper';

// import { styles } from './index.style';
// import { color } from '../../../styles/vars';
// import { formatDate, capitalize, colorAction, moneyFormat, valueWithSign, colorValue } from '../../../config/utils';
// import { actionName, actionIcon, actionColor, actionOpen } from './helpers';

// export const failedSet = (item) => (
//   <View>
//     <View style={{ flexDirection: 'row' }}>
//       <Text style={styles.textMessageDesktop}>{`${item.data.error} Robot `}</Text>
//       <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>{item.robot.name}</Text>
//       <Text style={styles.textMessageDesktop}> (</Text>
//       <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>{item.data.userRobotId}</Text>
//       <Text style={styles.textMessageDesktop}>)</Text>
//     </View>
//     <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 3 }}>
//       <Text style={styles.textMessageDesktop}>{`Error occurred while processing robot job ${item.data.jobType}. `}</Text>
//       <Text style={styles.textMessageDesktop}>Please contact support.</Text>
//     </View>
//   </View>
// );

// export const messageSet = (item) => (
//   <Text style={[ styles.textMessageDesktop, { flexShrink: 1 } ]}>
//     {`${item.type === 'message.support-reply'
//       ? 'Support Team'
//       : 'Announcement'} - ${item.data.message.replace(/<[^>]*>/g, '')}`}
//   </Text>
// );

// export const robotTradeSet = (item) => (
//   <View>
//     {item.data.status === 'open' ? (
//       <>
//         <View style={{ flexDirection: 'row' }}>
//           <Text style={styles.textMessageDesktop}>Trade </Text>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>{item.robot.name} </Text>
//           <Text style={styles.textMessageDesktop}>{item.data.code}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 3 }}>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>Entry </Text>
//           <Text style={[ styles.textMessageDesktop, colorAction(item.data.entryAction) ]}>
//             {capitalize(item.data.entryAction)}
//           </Text>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>  Volume </Text>
//           <Text style={styles.textMessageDesktop}>
//             {`${item.data.entryExecuted} ${item.robot.asset}`}
//           </Text>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>  Price </Text>
//           <Text style={styles.textMessageDesktop}>
//             {`${item.data.entryPrice} $`}
//           </Text>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>  Date </Text>
//           <Text style={styles.textMessageDesktop}>
//             {formatDate(item.data.entryDate)}
//           </Text>
//         </View>
//       </>
//     ) : (
//       <>
//         <View style={{ flexDirection: 'row' }}>
//           <Text style={styles.textMessageDesktop}>Trade </Text>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>{item.robot.name} </Text>
//           <Text style={styles.textMessageDesktop}>{item.data.code}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 3 }}>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>Exit </Text>
//           <Text style={[ styles.textMessageDesktop, colorAction(item.data.exitAction) ]}>
//             {capitalize(item.data.exitAction).split(/(?=[A-Z])/).join(' ')}
//           </Text>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>  Volume </Text>
//           <Text style={styles.textMessageDesktop}>
//             {`${item.data.exitExecuted} ${item.robot.asset}`}
//           </Text>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>  Price </Text>
//           <Text style={styles.textMessageDesktop}>
//             {`${item.data.exitPrice} $`}
//           </Text>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>  Date </Text>
//           <Text style={styles.textMessageDesktop}>
//             {formatDate(item.data.exitDate)}
//           </Text>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>  Profit </Text>
//           <Text style={[ styles.textMessageDesktop, colorValue(item.data.profit) ]}>
//             {`${valueWithSign(moneyFormat(item.data.profit))} $`}
//           </Text>
//         </View>
//       </>
//     )}
//   </View>
// );

// export const errorSet = (item) => (
//   <View>
//     <View style={{ flexDirection: 'row' }}>
//       <Text style={styles.textMessageDesktop}>Robot </Text>
//       <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>{item.robot.name}</Text>
//       <Text style={styles.textMessageDesktop}> (</Text>
//       <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>{item.data.userRobotId}</Text>
//       <Text style={styles.textMessageDesktop}>)</Text>
//     </View>
//     <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap', marginTop: 3 }}>
//       <Text style={styles.textMessageDesktop}>Error occurred while processing order </Text>
//       <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>{item.data.exId}</Text>
//       <Text style={styles.textMessageDesktop}>{` ${item.data.error}. `}</Text>
//       <Text style={styles.textMessageDesktop}>Please check your API Keys and Robot settings or contact support.</Text>
//     </View>
//   </View>
// );

// export const signalAlertSet = (item) => (
//   <>
//     <View style={{ flexDirection: 'row' }}>
//       <Text style={styles.textMessageDesktop}>Signal </Text>
//       <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>{item.robot.name} </Text>
//       <Text style={styles.textMessageDesktop}>{item.robot_position.code}</Text>
//     </View>
//     <View style={{ flexDirection: 'row', marginTop: 3 }}>
//       <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>Action </Text>
//       <Text style={styles.textMessageDesktop}>{actionName(item.data.action)}</Text>
//       <IconButton
//         style={{ height: 10, width: 10, marginTop: 4 }}
//         icon={actionIcon(item.data.action)}
//         size={16}
//         color={actionColor(item.data.action)} />
//       <Text style={styles.textMessageDesktop}>{capitalize(item.data.orderType)} </Text>
//       <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}> Price </Text>
//       <Text style={styles.textMessageDesktop}>{`${moneyFormat(item.data.price)} $`}</Text>
//       <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>  Date </Text>
//       <Text style={styles.textMessageDesktop}>{formatDate(item.data.timestamp)}</Text>
//     </View>
//   </>
// );

// export const robotSet = (item) => (
//   <View>
//     <View style={{ flexDirection: 'row' }}>
//       <Text style={styles.textMessageDesktop}>Robot </Text>
//       <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>{item.robot.name}</Text>
//       <Text style={styles.textMessageDesktop}>{` is ${item.type.split('.')[1]}`}</Text>
//     </View>
//     {item.data.message ? (
//       <Text style={[ styles.textMessageDesktop, { flexShrink: 1, marginTop: 3 } ]}>
//         {item.data.message}
//       </Text>
//     ) : null}
//   </View>
// );

// export const signalTradeSet = (item) => (
//   <View>
//     {actionOpen(item.data.action) ? (
//       <>
//         <View style={{ flexDirection: 'row' }}>
//           <Text style={styles.textMessageDesktop}>Signal Trade </Text>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>{item.robot.name} </Text>
//           <Text style={styles.textMessageDesktop}>{item.data.positionCode}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 3 }}>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>Entry </Text>
//           <Text style={[ styles.textMessageDesktop, colorAction(item.data.action) ]}>
//             {capitalize(item.data.action)}
//           </Text>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>  Price </Text>
//           <Text style={styles.textMessageDesktop}>
//             {`${item.data.price} $`}
//           </Text>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>  Date </Text>
//           <Text style={styles.textMessageDesktop}>
//             {formatDate(item.data.timestamp)}
//           </Text>
//         </View>
//       </>
//     ) : (
//       <>
//         <View style={{ flexDirection: 'row' }}>
//           <Text style={styles.textMessageDesktop}>Signal Trade </Text>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>{item.robot.name} </Text>
//           <Text style={styles.textMessageDesktop}>{item.data.positionCode}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 3 }}>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>Exit </Text>
//           <Text style={[ styles.textMessageDesktop, colorAction(item.data.action) ]}>
//             {capitalize(item.data.action).split(/(?=[A-Z])/).join(' ')}
//           </Text>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>  Price </Text>
//           <Text style={styles.textMessageDesktop}>
//             {`${item.data.price} $`}
//           </Text>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>  Date </Text>
//           <Text style={styles.textMessageDesktop}>
//             {formatDate(item.data.timestamp)}
//           </Text>
//           <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>  Profit </Text>
//           <Text style={[ styles.textMessageDesktop, colorValue(item.data.profit) ]}>
//             {`${valueWithSign(moneyFormat(item.data.profit))} $`}
//           </Text>
//         </View>
//       </>
//     )}
//   </View>
// );

// export const userSet = (item) => (
//   <View>
//     <View style={{ flexDirection: 'row' }}>
//       <Text style={styles.textMessageDesktop}>Your API Key </Text>
//       <Text style={[ styles.textMessageDesktop, { color: color.accent } ]}>{item.data.name}</Text>
//       <Text style={styles.textMessageDesktop}> is invalid!</Text>
//     </View>
//     <View style={{ flexDirection: 'row', marginTop: 3 }}>
//       <Text style={styles.textMessageDesktop}>{item.data.error}</Text>
//       <Text style={styles.textMessageDesktop}> Please update your API Key information in your Profile.</Text>
//     </View>
//   </View>
// );
