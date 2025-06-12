import React, { useState, useEffect, Children, cloneElement } from 'react';
import styles from './Animations.module.css';

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function FloatingObject({ children }) {
    const [floatStyle, setFloatStyle] = useState({});

    useEffect(() => {
        const newStyle = {
        '--tx1': `${randomNum(7, 12)}px`,
        '--tx2': `${randomNum(-7, -12)}px`,
        '--ty1': `${randomNum(10, 16)}px`,
        '--ty2': `${randomNum(-10, -16)}px`,
        '--r1': `${randomNum(-5, 5)}deg`,
        '--r2': `${randomNum(-5, 5)}deg`,

        animationDelay: `${randomNum(0, -15)}s`
        };
        setFloatStyle(newStyle);
    }, []);

    const child = Children.only(children);

    return cloneElement(child, {
        className: `${child.props.className || ''} ${styles.isFloating}`,
        style: {
            ...child.props.style,
            ...floatStyle
        }
    });
}