import React, { useEffect, useRef } from 'react';
import { World } from 'lib/game/world';
import {  chakra } from '@chakra-ui/react';

const size = 7;

export const WorldView = (({ world }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [x, y] = world.size;

  useEffect(() => {}, [canvasRef.current, world]);

  return (
      <chakra.table
        p={3}
        color="gray.700"
        borderWidth={1}
        borderStyle="solid"
        borderColor="black"
      >
        <tbody>
          <chakra.tr h={size} minH={size}>
            <chakra.th w={size} minW={size} bg="gray.100" />
            {Array(x)
              .fill(0)
              .map((_, i) => {
                return (
                  <chakra.th w={size} minW={size} key={i} bg="gray.100">
                    {i}
                  </chakra.th>
                );
              })}
          </chakra.tr>
          {Array(y)
            .fill(0)
            .map((_, line) => {
              return (
                <chakra.tr h={size} key={line}>
                  <chakra.th w={size} bg="gray.100">
                    {line}
                  </chakra.th>
                  {Array(x)
                    .fill(0)
                    .map((_, col) => {
                      const slot = world.getSlot(col, line)!;
                      return (
                        <chakra.td
                          bgColor={slot.block.color}
                          w={size}
                          minW={size}
                          color={slot.entity?.color}
                          fontWeight="bold"
                          textAlign="center"
                          key={
                            line +
                            '' +
                            col +
                            slot.entity?.name +
                            slot.block.color
                          }
                        >
                          {slot.entity?.name}
                        </chakra.td>
                      );
                    })}
                </chakra.tr>
              );
            })}
        </tbody>
      </chakra.table>
  );
}) as React.FC<{ world: World }>;
