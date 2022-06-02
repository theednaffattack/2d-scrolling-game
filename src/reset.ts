import { GenericEntity } from "./generic-entity";
import { init } from "./init";
import { Platform } from "./platform";
import { Player } from "./player";

interface ResetProps {
  backgroundImage: HTMLImageElement;
  context: CanvasRenderingContext2D;
  genericEntities: GenericEntity[];
  hillImage: HTMLImageElement;
  platforms: Platform[];
  platformImage: HTMLImageElement;
  player: Player;
  scrollOffset: number;
}

export function reset({
  context,
  genericEntities,
  platforms,
  player,
  scrollOffset,
}: ResetProps) {
  scrollOffset = 0;

  const newPlayer = new Player();

  player.color = newPlayer.color;
  player.height = newPlayer.height;
  player.position.x = newPlayer.position.x;
  player.position.y = newPlayer.position.y;
  player.velocity.x = newPlayer.velocity.x;
  player.velocity.y = newPlayer.velocity.y;
  player.width = newPlayer.width;

  const { platforms: resetPlatforms, genericEntities: resetEntities } = init({
    context,
  });

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

  genericEntities.forEach((_, entityIndex) => {
    genericEntities[entityIndex].draw = resetEntities[entityIndex].draw;
    genericEntities[entityIndex].height = resetEntities[entityIndex].height;
    genericEntities[entityIndex].image = resetEntities[entityIndex].image;
    genericEntities[entityIndex].position = resetEntities[entityIndex].position;
    genericEntities[entityIndex].width = resetEntities[entityIndex].width;
  });
}
