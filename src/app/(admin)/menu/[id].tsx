import {View, Text, Image, StyleSheet, Pressable} from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack, useRouter, Link } from 'expo-router';
import products from '@assets/data/Products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import {useState} from 'react';
import Button from '@components/Buttons';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';
import { FontAwesome } from '@expo/vector-icons';

//Sizes of Pizza for the user to choose
const sizes: PizzaSize[]=['S','M','L','XL'];

const ProductDetailsScreen=() => {
    const{id}=useLocalSearchParams();
    const{addItem}=useCart();
    const router=useRouter();
    const[selectedSize, setSelectedSize]=useState<PizzaSize>('M');
    const product=products.find((p)=>p.id.toString()==id);
    const addToCart=()=> {
        if (!product) {
            return;
        }
        addItem(product, selectedSize);
        router.push('/cart');
    };
    if (!product) {
        return <Text>Oops! No food here!</Text>
    }
    return (
        //Menu screen
        <View style={styles.container}>
            <Stack.Screen options={{title: 'Menu', headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    //color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),}}/>
            <Stack.Screen options={{title: product.name}}/>
            <Image 
                source={{uri: product.image || defaultPizzaImage}}
                style={styles.image}
            />

            <Text style={styles.sizeText}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
        </View>
    );
};

//Styles
const styles=StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
    },
    image: {
        width: '30%',
        aspectRatio: 1,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    size: {
        backgroundColor: 'gainsboro',
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeText: {
        fontSize: 20,
        fontWeight: '500',
    },
});

export default ProductDetailsScreen