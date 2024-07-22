// HomeScreen.tsx
import React from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import PostCard from '../components/PostCard'; // Adjust the path based on your structure

// Demo comments
const comments = [
  { id: '1', text: 'Great post!', user: 'user1' },
  { id: '2', text: 'Awesome!', user: 'user2' },
  { id: '3', text: 'Loved it!', user: 'user3' },
];

// Demo posts
const posts = [
  {
    id: '1',
    imageUrl:
      'https://imgs.search.brave.com/KCs1Whewrtr-TrrOTCO_lxxxfVATnyuA9eNa4FlKR6Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQy/MjIzOTY1MS9waG90/by9hdmF0YXJzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz10/TFhFSWtzVUY2c1Q5/eW5pdFZnZ21POTc3/Qm5qUTZ2ZDROTkZj/X2lqQWgwPQ',
    userName: 'Usergram_',
    likes: 15672,
    comments: comments,
  },
  {
    id: '2',
    imageUrl:
      'https://imgs.search.brave.com/KCs1Whewrtr-TrrOTCO_lxxxfVATnyuA9eNa4FlKR6Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQy/MjIzOTY1MS9waG90/by9hdmF0YXJzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz10/TFhFSWtzVUY2c1Q5/eW5pdFZnZ21POTc3/Qm5qUTZ2ZDROTkZj/X2lqQWgwPQ',
    userName: 'Adward_Collin',
    likes: 12345,
    comments: comments,
  },
  {
    id: '3',
    imageUrl:
      'https://imgs.search.brave.com/KCs1Whewrtr-TrrOTCO_lxxxfVATnyuA9eNa4FlKR6Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQy/MjIzOTY1MS9waG90/by9hdmF0YXJzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz10/TFhFSWtzVUY2c1Q5/eW5pdFZnZ21POTc3/Qm5qUTZ2ZDROTkZj/X2lqQWgwPQ',
    userName: '_Symphony',
    likes: 15672,
    comments: comments,
  },
  {
    id: '4',
    imageUrl:
      'https://imgs.search.brave.com/KCs1Whewrtr-TrrOTCO_lxxxfVATnyuA9eNa4FlKR6Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQy/MjIzOTY1MS9waG90/by9hdmF0YXJzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz10/TFhFSWtzVUY2c1Q5/eW5pdFZnZ21POTc3/Qm5qUTZ2ZDROTkZj/X2lqQWgwPQ',
    userName: 'RetrieveX',
    likes: 12345,
    comments: comments,
  },
  {
    id: '5',
    imageUrl:
      'https://imgs.search.brave.com/KCs1Whewrtr-TrrOTCO_lxxxfVATnyuA9eNa4FlKR6Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQy/MjIzOTY1MS9waG90/by9hdmF0YXJzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz10/TFhFSWtzVUY2c1Q5/eW5pdFZnZ21POTc3/Qm5qUTZ2ZDROTkZj/X2lqQWgwPQ',
    userName: 'Ava-tar',
    likes: 15672,
    comments: comments,
  },
  {
    id: '6',
    imageUrl:
      'https://imgs.search.brave.com/KCs1Whewrtr-TrrOTCO_lxxxfVATnyuA9eNa4FlKR6Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQy/MjIzOTY1MS9waG90/by9hdmF0YXJzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz10/TFhFSWtzVUY2c1Q5/eW5pdFZnZ21POTc3/Qm5qUTZ2ZDROTkZj/X2lqQWgwPQ',
    userName: 'Kidd0',
    likes: 12345,
    comments: comments,
  },
];

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* List of Posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            imageUrl={item.imageUrl}
            userName={item.userName}
            likes={item.likes}
            comments={item.comments}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default HomeScreen;
