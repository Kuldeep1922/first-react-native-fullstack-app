import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { AuthContext } from '@/context/authContext';
import FooterMenu from './../components/Menus/FooterMenu';
import HeaderMenu from './../components/Menus/HeaderMenu';
import { PostContext } from '@/context/postContext';

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleString(); // This will show both date and time
};


const PostCard = ({ post }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarBorder}>
            <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar} />
          </View>
          <View>
            <Text style={styles.posterName}>{post.postedBy.name}</Text>
            <Text style={styles.postDate}>{formatDate(post.createdAt)}</Text>
          </View>
        </View>
        <Text style={styles.more}>...</Text>
      </View>
      <Text style={styles.postTitle}>{post.title}</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.postDescription}>{post.description}</Text>
      </View>
    </View>
  );
};

const Home = () => {
  const [state] = useContext(AuthContext);
  const [posts] = useContext(PostContext);

  return (
    <View style={styles.container}>
      <HeaderMenu name={"Kuldeep"} />
      <ScrollView>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </ScrollView>
      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBorder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  posterName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postDate: {
    fontSize: 12,
    color: '#777',
  },
  more: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  descriptionContainer: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    height: 300,
  },
  postDescription: {
    fontSize: 14,
    color: '#333',
  },
});

export default Home;
