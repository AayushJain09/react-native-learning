import Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const {width} = Dimensions.get('window');

interface Comment {
  id: string;
  text: string;
  user: string;
}

interface PostCardProps {
  imageUrl: string;
  userName: string;
  likes: number;
  comments: Comment[];
}

const PostCard: React.FC<PostCardProps> = ({
  imageUrl,
  userName,
  likes,
  comments,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const [showAllComments, setShowAllComments] = useState(false);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };
  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://imgs.search.brave.com/ldjDWR16xqPlvTuu_DLjIJsCvp1Vhrb2-fSxBypbAsg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyMi5wbmc',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{userName}</Text>
        <TouchableOpacity style={styles.rightIcon}>
          <Icon name="ellipsis-h" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <Image source={{uri: imageUrl}} style={styles.postImage} />
      <View style={styles.footer}>
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleLikePress}>
            <Icon name="thumbs-up" size={30} color={isLiked ? 'red' : 'gray'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="comment" size={30} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="share" size={30} color="gray" />
          </TouchableOpacity>
          {/* RightSide save Icon */}
          <TouchableOpacity style={styles.rightIcon}>
            <Icon name="save" size={30} color="gray" />
          </TouchableOpacity>
        </View>
        {/* likes counts */}
        <Text style={styles.likes}>{likes.toLocaleString()} likes</Text>
        {/* user name */}
        <View style={styles.subUser}>
          <Image
            source={{
              uri: 'https://imgs.search.brave.com/ldjDWR16xqPlvTuu_DLjIJsCvp1Vhrb2-fSxBypbAsg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyMi5wbmc',
            }}
            style={styles.subProfileImage}
          />
          <Text style={styles.userName}>{userName}</Text>
        </View>
        {/* comments list */}
        <FlatList
          data={showAllComments ? comments : comments.slice(0, 2)}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.commentContainer}>
              <Text style={styles.commentUser}>{item.user} </Text>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          )}
        />
        {/* Show More/Show Less Button */}
        {comments.length > 2 && (
          <TouchableOpacity onPress={toggleShowAllComments}>
            <Text style={styles.showMore}>
              {showAllComments ? 'Show Less' : 'Show More'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  subUser: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 0,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  subProfileImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  userName: {
    color: 'black',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: width,
    resizeMode: 'cover',
  },
  footer: {
    padding: 10,
  },
  likes: {
    padding: 2,
    color: 'gray',
    fontWeight: 'bold',
  },
  commentContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  commentUser: {
    color: 'black',
    fontWeight: 'bold',
  },
  commentText: {
    color: 'gray',
    marginLeft: 5,
  },
  rightIcon: {
    position: 'absolute',
    right: 6,
  },
  showMore: {
    color: 'blue',
    marginTop: 5,
  },
});

export default PostCard;
