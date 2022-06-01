import { GenericEntity } from "./generic-entity";
import { Platform } from "./platform";
import { Player } from "./player";

export function reset({
  backgroundImage,
  context,
  genericEntities,
  hillImage,
  platforms,
  platformImage,
  player,
  scrollOffset,
}: {
  backgroundImage: HTMLImageElement;
  context: CanvasRenderingContext2D;
  genericEntities: GenericEntity[];
  hillImage: HTMLImageElement;
  platforms: Platform[];
  platformImage: HTMLImageElement;
  player: Player;
  scrollOffset: number;
}) {
  // Player defaults...
  // color: "red",
  // height: 30,
  // position.x: 100
  // position.y: 100
  // velocity.x: 0
  // velocity.y: 0
  // width: 30

  // Move player back to the start position
  // player.position.x = 100;
  // player.position.y = 100;
  const newPlayer = new Player();

  player.color = newPlayer.color;
  player.height = newPlayer.height;
  player.position.x = newPlayer.position.x;
  player.position.y = newPlayer.position.y;
  player.velocity.x = newPlayer.velocity.x;
  player.velocity.y = newPlayer.velocity.y;
  player.width = newPlayer.width;

  const resetPlatforms = [
    new Platform({ x: -1, y: 470, image: platformImage }),
    new Platform({
      x: platformImage.width + 100,
      y: 470,
      image: platformImage,
    }),
  ];

  scrollOffset = 0;

  platforms.forEach((_, platformIndex) => {
    platforms[platformIndex].draw = resetPlatforms[platformIndex].draw;
    platforms[platformIndex].height = resetPlatforms[platformIndex].height;
    platforms[platformIndex].image = resetPlatforms[platformIndex].image;
    platforms[platformIndex].position.x =
      resetPlatforms[platformIndex].position.x;
    platforms[platformIndex].position.y =
      resetPlatforms[platformIndex].position.y;
    platforms[platformIndex].width = resetPlatforms[platformIndex].width;
  });

  const resetEntities = [
    new GenericEntity({
      x: -1,
      y: -1,
      image: backgroundImage,
    }),
    new GenericEntity({ x: 800, y: -1, image: hillImage }),

    new GenericEntity({
      x: -1,
      y: -1,
      image: hillImage,
    }),
  ];

  genericEntities.forEach((_, entityIndex) => {
    genericEntities[entityIndex].draw = resetEntities[entityIndex].draw;
    genericEntities[entityIndex].height = resetEntities[entityIndex].height;
    genericEntities[entityIndex].image = resetEntities[entityIndex].image;
    genericEntities[entityIndex].position = resetEntities[entityIndex].position;
    genericEntities[entityIndex].width = resetEntities[entityIndex].width;
  });

  // genericEntities = [
  //   new GenericEntity({
  //     x: -1,
  //     y: -1,
  //     image: backgroundImage,
  //   }),
  //   new GenericEntity({ x: 800, y: -1, image: hillImage }),

  //   new GenericEntity({
  //     x: -1,
  //     y: -1,
  //     image: hillImage,
  //   }),
  // ];
  // console.log("VIEW INSIDE INIT", { player, genericEntities, platforms });
}
