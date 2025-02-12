import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate()

  const handleRepositoryPageLink = (itemId) => {
    navigate(`/${itemId}`)
  }


  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => 
          <Pressable onPress={() => handleRepositoryPageLink(item.id)}>
            <RepositoryItem item={item}/>
          </Pressable>}
        keyExtractor={item => item.id}
      />
    </View>
  );

}

const RepositoryList = () => {

  const { repositories, loading } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;

};

export default RepositoryList;