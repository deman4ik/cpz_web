// import React from 'react';
// import { Text, View } from 'react-native';
// import { IconButton } from 'react-native-paper';

// import { styles } from './index.style';
// import { color } from '../../../styles/vars';
// import { formatDate, capitalize, colorAction, moneyFormat, valueWithSign, colorValue } from '../../../services/Utils';
// import { actionName, actionIcon, actionColor, actionOpen } from './helpers';

// export const failedSet = (item) => (
//   <View style={{ flex: 1 }}>
//     <Text style={styles.textMessageCard}>{`${item.data.error} Robot `}</Text>
//     <Text style={[ styles.textMessageCard, { color: color.accent } ]}>{item.robot.name}</Text>
//     <Text style={[ styles.textMessageCard, { color: color.accent } ]}>{item.data.userRobotId}</Text>
//     <Text style={styles.textMessageCard}>{`Error occurred while processing robot job ${item.data.jobType}.`}</Text>
//     <Text style={styles.textMessageCard}>Please contact support.</Text>
//   </View>
// );

// export const messageSet = (item) => (
//   <Text style={[ styles.textMessageCard, { flexShrink: 1 } ]}>
//     {`${item.type === 'message.support-reply' ? 'Support Team' : 'Announcement'} - ${item.data.message.replace(/<[^>]*>/g, '')}`}
//   </Text>
// );

// export const robotTradeSet = (item) => (
//   <View style={{ flex: 1 }}>
//     {item.data.status === 'open' ? (
//       <>
//         <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
//           <Text style={styles.textMessageCard}>Trade </Text>
//           <Text style={[ styles.textMessageCard, { color: color.accent } ]}>{item.robot.name} </Text>
//           <Text style={styles.textMessageCard}>{item.data.code}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', flex: 1 }}>
//           <View style={{ flex: 1, justifyContent: 'space-around', marginTop: 5 }}>
//             <View style={{ alignItems: 'flex-start' }}>
//               <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Entry</Text>
//               <Text style={[ styles.textMessageCard, colorAction(item.data.entryAction) ]}>
//                 {capitalize(item.data.entryAction)}
//               </Text>
//             </View>
//             <View style={{ alignItems: 'flex-start', marginTop: 5 }}>
//               <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Price</Text>
//               <Text style={styles.textMessageCard}>
//                 {`${item.data.entryPrice} $`}
//               </Text>
//             </View>
//           </View>
//           <View style={{ flex: 1, justifyContent: 'space-around', marginTop: 5 }}>
//             <View style={{ alignItems: 'flex-start' }}>
//               <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Volume</Text>
//               <Text style={styles.textMessageCard}>
//                 {`${item.data.entryExecuted} ${item.robot.asset}`}
//               </Text>
//             </View>
//             <View style={{ alignItems: 'flex-start', marginTop: 5 }}>
//               <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Date</Text>
//               <Text style={styles.textMessageCard}>
//                 {formatDate(item.data.entryDate)}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </>
//     ) : (
//       <>
//         <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
//           <Text style={styles.textMessageCard}>Trade </Text>
//           <Text style={[ styles.textMessageCard, { color: color.accent } ]}>{item.robot.name} </Text>
//           <Text style={styles.textMessageCard}>{item.data.code}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', flex: 1 }}>
//           <View style={{ flex: 1, justifyContent: 'space-around', marginTop: 5 }}>
//             <View style={{ alignItems: 'flex-start' }}>
//               <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Exit</Text>
//               <Text style={[ styles.textMessageCard, colorAction(item.data.exitAction) ]}>
//                 {capitalize(item.data.exitAction).split(/(?=[A-Z])/).join(' ')}
//               </Text>
//             </View>
//             <View style={{ alignItems: 'flex-start', marginTop: 5 }}>
//               <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Price</Text>
//               <Text style={styles.textMessageCard}>
//                 {`${item.data.exitPrice} $`}
//               </Text>
//             </View>
//           </View>
//           <View style={{ flex: 1, marginTop: 5, justifyContent: 'space-around' }}>
//             <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
//               <View style={{ alignItems: 'flex-start' }}>
//                 <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Volume</Text>
//                 <Text style={styles.textMessageCard}>
//                   {`${item.data.exitExecuted} ${item.robot.asset}`}
//                 </Text>
//               </View>
//               <View style={{ alignItems: 'flex-start' }}>
//                 <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Profit</Text>
//                 <Text style={[ styles.textMessageCard, colorValue(item.data.profit) ]}>
//                   {`${valueWithSign(moneyFormat(item.data.profit))} $`}
//                 </Text>
//               </View>
//             </View>
//             <View style={{ alignItems: 'flex-start', marginTop: 5 }}>
//               <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Date</Text>
//               <Text style={styles.textMessageCard}>
//                 {formatDate(item.data.exit_date)}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </>
//     )}
//   </View>
// );

// export const errorSet = (item) => (
//   <View style={{ flex: 1 }}>
//     <View style={{ flexDirection: 'row' }}>
//       <Text style={styles.textMessageCard}>Robot </Text>
//       <Text style={[ styles.textMessageCard, { color: color.accent } ]}>{item.robot.name}</Text>
//     </View>
//     <Text style={[ styles.textMessageCard, { color: color.accent } ]}>{item.data.userRobotId}</Text>
//     <Text style={styles.textMessageCard}>Error occurred while processing order</Text>
//     <View style={{ flexDirection: 'row' }}>
//       <Text style={[ styles.textMessageCard, { color: color.accent } ]}>{item.data.exId}</Text>
//       <Text style={styles.textMessageCard}>{` ${item.data.error}.`}</Text>
//     </View>
//     <Text style={styles.textMessageCard}>Please check your API Keys and Robot settings or contact support.</Text>
//   </View>
// );

// export const signalAlertSet = (item) => (
//   <View style={{ flex: 1 }}>
//     <View style={{ flexDirection: 'row' }}>
//       <Text style={styles.textMessageCard}>Signal </Text>
//       <Text style={[ styles.textMessageCard, { color: color.accent } ]}>{item.robot.name} </Text>
//       <Text style={styles.textMessageCard}>{item.robot_position.code}</Text>
//     </View>
//     <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginTop: 5, flexWrap: 'wrap' }}>
//       <View style={{ alignItems: 'flex-start' }}>
//         <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Price</Text>
//         <Text style={styles.textMessageCard}>{`${item.data.price} $`}</Text>
//       </View>
//       <View style={{ alignItems: 'flex-start' }}>
//         <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Action</Text>
//         <View style={{ flexDirection: 'row' }}>
//           <Text style={styles.textMessageCard}>{actionName(item.data.action)}</Text>
//           <IconButton
//             style={{ height: 10, width: 10, marginTop: 4 }}
//             icon={actionIcon(item.data.action)}
//             size={16}
//             color={actionColor(item.data.action)} />
//           <Text style={styles.textMessageCard}>{capitalize(item.data.orderType)} </Text>
//         </View>
//       </View>
//       <View style={{ alignItems: 'flex-start' }}>
//         <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Date</Text>
//         <Text style={styles.textMessageCard}>{formatDate(item.data.timestamp)}</Text>
//       </View>
//     </View>
//   </View>
// );

// export const robotSet = (item) => (
//   <View style={{ flex: 1 }}>
//     <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
//       <Text style={styles.textMessageCard}>Robot </Text>
//       <Text style={[ styles.textMessageCard, { color: color.accent } ]}>{item.robot.name}</Text>
//       <Text style={styles.textMessageCard}>{`is ${item.type.split('.')[1]}`}</Text>
//     </View>
//     {item.data.message ? (
//       <Text style={[ styles.textMessageCard, { flexShrink: 1 } ]}>
//         {item.data.message}
//       </Text>
//     ) : null}
//   </View>
// );

// export const signalTradeSet = (item) => (
//   <View>
//     {actionOpen(item.data.action) ? (
//       <>
//         <Text style={styles.textMessageCard}>Signal Trade </Text>
//         <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
//           <Text style={[ styles.textMessageCard, { color: color.accent } ]}>{item.robot.name} </Text>
//           <Text style={styles.textMessageCard}>{item.data.code}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginTop: 5, flexWrap: 'wrap' }}>
//           <View style={{ alignItems: 'flex-start' }}>
//             <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Entry</Text>
//             <Text style={[ styles.textMessageCard, colorAction(item.data.action) ]}>
//               {capitalize(item.data.action)}
//             </Text>
//           </View>
//           <View style={{ alignItems: 'flex-start' }}>
//             <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Price</Text>
//             <Text style={styles.textMessageCard}>
//               {`${item.data.price} $`}
//             </Text>
//           </View>
//           <View style={{ alignItems: 'flex-start' }}>
//             <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Date</Text>
//             <Text style={styles.textMessageCard}>
//               {formatDate(item.data.timestamp)}
//             </Text>
//           </View>
//         </View>
//       </>
//     ) : (
//       <>
//         <Text style={styles.textMessageCard}>Signal Trade </Text>
//         <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
//           <Text style={[ styles.textMessageCard, { color: color.accent } ]}>{item.robot.name} </Text>
//           <Text style={styles.textMessageCard}>{item.data.code}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', flex: 1 }}>
//           <View style={{ flex: 1, justifyContent: 'space-around', marginTop: 5 }}>
//             <View style={{ alignItems: 'flex-start' }}>
//               <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Exit</Text>
//               <Text style={[ styles.textMessageCard, colorAction(item.data.action) ]}>
//                 {capitalize(item.data.action).split(/(?=[A-Z])/).join(' ')}
//               </Text>
//             </View>
//             <View style={{ alignItems: 'flex-start', marginTop: 5 }}>
//               <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Price</Text>
//               <Text style={styles.textMessageCard}>
//                 {`${item.data.price} $`}
//               </Text>
//             </View>
//           </View>
//           <View style={{ flex: 1, marginTop: 5, justifyContent: 'space-around' }}>
//             <View style={{ alignItems: 'flex-start' }}>
//               <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Profit</Text>
//               <Text style={[ styles.textMessageCard, colorValue(item.data.profit) ]}>
//                 {`${valueWithSign(moneyFormat(item.data.profit))} $`}
//               </Text>
//             </View>
//             <View style={{ alignItems: 'flex-start', marginTop: 5 }}>
//               <Text style={[ styles.textMessageCard, { color: color.accent } ]}>Date</Text>
//               <Text style={styles.textMessageCard}>
//                 {formatDate(item.data.timestamp)}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </>
//     )}
//   </View>
// );

// export const userSet = (item) => (
//   <View>
//     <View style={{ flexDirection: 'row' }}>
//       <Text style={styles.textMessageCard}>Your API Key </Text>
//       <Text style={[ styles.textMessageCard, { color: color.accent } ]}>{item.data.name}</Text>
//       <Text style={styles.textMessageCard}> is invalid!</Text>
//     </View>
//     <Text style={styles.textMessageCard}>{item.data.error}</Text>
//     <Text style={styles.textMessageCard}>Please update your API Key information in your Profile.</Text>
//   </View>
// );
