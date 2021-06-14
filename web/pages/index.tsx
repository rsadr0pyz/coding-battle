import { Button, chakra, HStack, Text } from '@chakra-ui/react';
import { WorldView } from 'components/world-view';
import { Player } from 'lib/game/entity';
import { Game } from 'lib/game/game';
import { GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react';

export const Index = (({}) => {
  function newGame() {
    return {
      game: new Game([new Player('A', 'red.300'), new Player('B', 'blue.300')])
    };
  }

  const [{ game }, setGame] = useState(newGame());

  useEffect(() => {
    game.on('renderRequest', () => {
      setGame({ game });
    });

    //@ts-expect-error
    window.game = game;
  }, [game]);

  return (
    <div>
      <WorldView world={game.world} />
      <HStack spacing={4} m={4}>
        <Button
          disabled={!game.hasStarted()}
          onClick={() => setGame(newGame())}
        >
          Reset
        </Button>
        <Button
          disabled={game.hasStarted()}
          onClick={() => game.start()}
          mr={3}
        >
          Start
        </Button>
        {game.players.map((player) => (
          <chakra.div key={player.name} borderRadius={4} bg="gray.100">
            <Text w="100%" textAlign="center">
              {player.name}
            </Text>
            <Button
              disabled={!player.canMoveUp()}
              onClick={() => player.moveUp()}
            >
              🔼
            </Button>
            <Button
              disabled={!player.canMoveLeft()}
              onClick={() => player.moveLeft()}
            >
              ◀
            </Button>
            <Button
              disabled={!player.canMoveDown()}
              onClick={() => player.moveDown()}
            >
              🔽
            </Button>
            <Button
              disabled={!player.canMoveRight()}
              onClick={() => player.moveRight()}
            >
              ▶
            </Button>
          </chakra.div>
        ))}
      </HStack>
    </div>
  );
}) as React.FC<IndexProps>;

type IndexProps = {
  //
};

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  return {
    revalidate: 60 * 5, // 5 Minutos
    props: {}
  };
};

export default Index;
