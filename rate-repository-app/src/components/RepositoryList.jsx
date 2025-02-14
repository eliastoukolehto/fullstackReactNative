import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryFilter = ({ filter, setFilter }) => {
  return (
    <Searchbar 
      placeholder='Filter repositories'
      value={filter}
      onChangeText={setFilter}
    />
  )
}

const RepositorySorter = ({ order, setOrder }) => {

  return (
    <View>
      <Picker
      selectedValue={order}
      onValueChange={(itemValue, itemIndex) => 
        setOrder(itemValue)
      }>
        <Picker.Item label='Latest repositories' value='latest' />
        <Picker.Item label='Highest rated repositories' value='highestRated' />
        <Picker.Item label='Lowest rated repositories' value='lowestRated' />
      </Picker>
    </View>
  )
}

const RenderHeader = ({filter, setFilter, order, setOrder}) => {

  return (
    <View>
      <RepositoryFilter filter={filter} setFilter={setFilter} />
      <RepositorySorter order={order} setOrder={setOrder}/>
    </View>
  )
}

export const RepositoryListContainer = ({ repositories, order, setOrder, filter, setFilter, onEndReached }) => {
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
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => 
          <Pressable onPress={() => handleRepositoryPageLink(item.id)}>
            <RepositoryItem item={item}/>
          </Pressable>}
        keyExtractor={item => item.id}
        ListHeaderComponent={<RenderHeader filter={filter} setFilter={setFilter} order={order} setOrder={setOrder}/>}
      />
    </View>
  );

}

const RepositoryList = () => {
  const first = 4

  const [orderBySelection, setOrderBySelection] = useState()
  const [filter, setFilter] = useState('')
  const [debouncedFilter] = useDebounce(filter, 1000)
  const { repositories, loading, fetchMore } = useRepositories(first, orderBySelection, debouncedFilter);

  const onEndReached = () => {
    console.log('fetching more...')
    fetchMore()
  }

  return <RepositoryListContainer 
    repositories={repositories} 
    order={orderBySelection} 
    setOrder={setOrderBySelection} 
    filter={filter}
    setFilter={setFilter}
    onEndReached={onEndReached}/>;

};



export default RepositoryList;