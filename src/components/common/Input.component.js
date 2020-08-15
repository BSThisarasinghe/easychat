import React from 'react';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';

const Input = ({
    label,
    value,
    onChangeText,
    secureTextEntry,
    placeholder,
    placeholderTextColor,
    labelStyle,
    style,
    returnKeyType,
    blurOnSubmit,
    onSubmitEditing,
    ref,
    multiline,
    numberOfLines,
    maxLength,
    inputStyle,
    labelIcon,
    editable,
    keyboardType,
    errorText,
    onBlur,
    onPressIcon,
    key
}) => {
    return (
        <View style={[styles.containerStyle, inputStyle]}>
            <View style={styles.labelContainerStyle}>
                <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
                <TouchableOpacity onPress={onPressIcon}>
                    <Image
                        source={labelIcon}
                        style={styles.addStyle}
                    />
                </TouchableOpacity>
            </View>
            <TextInput
                key={key}
                ref={ref}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                style={[styles.inputStyle, style]}
                returnKeyType={returnKeyType}
                blurOnSubmit={blurOnSubmit}
                onSubmitEditing={onSubmitEditing}
                multiline={multiline}
                numberOfLines={numberOfLines}
                maxLength={maxLength}
                editable={editable}
                keyboardType={keyboardType}
                onBlur={onBlur}
            />
            <View style={styles.errorContainerStyle}>
                <Text style={styles.errorStyle}>{errorText}</Text>
            </View>
        </View>
    );
};

const styles = {
    inputStyle: {
        fontFamily: 'ProximaNovaRegular',
        color: '#333333',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 14,
        lineHeight: 18,
        // flex: 1,
        backgroundColor: '#F4F7FC',
        width: '100%'
    },
    labelStyle: {
        fontFamily: 'ProximaNovaRegular',
        fontSize: 14,
        color: '#333333',
        marginBottom: 7,
        marginRight: 7
    },
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        color: '#000',
        // borderBottomWidth: 1,
        // borderBottomColor: 'rgba(82, 109, 127, 1)',
        marginBottom: 20
    },
    labelContainerStyle: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    addStyle: {
        width: 14,
        height: 14
    },
    errorContainerStyle: {
        paddingLeft: 20
    },
    errorStyle: {
        fontFamily: 'ProximaNovaRegular',
        fontSize: 12,
        color: 'red',
        marginTop: 5
    }
}

export { Input };