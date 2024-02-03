import React, {ComponentType, PropsWithChildren} from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';

// const withDismissKeyboard = Comp:<T> => {
//   return ({children, ...props}: PropsWithChildren&T) => (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//       <Comp {...props}>{children}</Comp>
//     </TouchableWithoutFeedback>
//   );
// };
function withDismissKeyboard<T>(Comp: ComponentType<T>) {
  return ({children, ...props}: T & PropsWithChildren) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
}

export default withDismissKeyboard;
