import pygame
import time
import random
from pathlib import Path

path = Path(__file__).resolve().parent
pygame.init()

# 화면 변수
screen_size = (700,1000)
screen_width, screen_height = screen_size
screen = pygame.display.set_mode(screen_size)
pygame.display.set_caption('전투기 게임')

# 게임 진행여부
running = True

# 플레이어 변수
player_img = pygame.image.load('{}/img/player.png'.format(path))
player_size = player_img.get_rect().size
player_width, player_height = player_size
player_x, player_y = [screen_width/2 - player_width/2, 800]
player_speed = 900

# 적 변수
enemies = []
enemy_img = pygame.image.load('{}/img/enemy.png'.format(path))
enemy_size = enemy_img.get_rect().size
enemy_width, enemy_height = enemy_size
enemy_speed = 300
enemy_spawn_time = time.time()
enemy_term = 0.5

# 백그라운드 변수
background_img = pygame.transform.scale(pygame.image.load('{}/img/background.png'.format(path)), screen_size)
background_width, background_height = background_img.get_rect().size
background_y = 0
background_speed = 50

# fps
clock = pygame.time.Clock()
df = clock.tick(100) # 1초에 100틱 실행
    
# 총알 변수
bullets = []
bullet_shot_time = time.time()
bullet_img = pygame.transform.scale2x(pygame.image.load('{}/img/bullet.png'.format(path)))
bullet_size = bullet_img.get_rect().size
bullet_width, bullet_height = bullet_size
bullet_speed = 2000
bullet_term = bullet_height/bullet_speed

# 아이템 변수
items = []
item_list = ["speed_up", "upgrade_weapon", "boom"]
item_states = {"speed_up": 0, "upgrade_weapon": 0, "boom": 0}
item_duration = 2
# item_img = pygame.transform.scale(pygame.image.load('{}/img/item.png'.format(path)), (50,50))
item_img = pygame.image.load('{}/img/item.png'.format(path))
item_size = item_img.get_rect().size
item_width, item_height = item_size
item_speed = 500




# 키 눌린 상태 감지
keys = {'left': 0, 'right': 0, 'up': 0, 'down': 0}

# 메인 루프
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        
        # 키 눌림 감지
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                keys['left'] = 1
            if event.key == pygame.K_RIGHT:
                keys['right'] = 1
            if event.key == pygame.K_UP:
                keys['up'] = 1
            if event.key == pygame.K_DOWN:
                keys['down'] = 1
        # 키 떼짐 감지
        if event.type == pygame.KEYUP:
            if event.key == pygame.K_LEFT:
                keys['left'] = 0
            if event.key == pygame.K_RIGHT:
                keys['right'] = 0
            if event.key == pygame.K_UP:
                keys['up'] = 0
            if event.key == pygame.K_DOWN:
                keys['down'] = 0

    # 눌린 키에 따라 움직이기
    if keys['left'] == 1:
        if player_x >= 0:
            player_x -= player_speed * df/1000 
    if keys['right'] == 1:
        if player_x <= screen_width - player_width:
            player_x += player_speed * df/1000
    if keys['up'] == 1:
        if player_y >= 0:
            player_y -= player_speed * df/1000
    if keys['down'] == 1:
        if player_y <= screen_height - player_height:
            player_y += player_speed * df/1000

    # 일정 시간마다 확률적으로 랜덤한 위치에 적 전투기 생성
    if time.time() - enemy_spawn_time >= enemy_term:    
        for i in range(random.randint(0,3)):
            enemies.append({'x':random.randint(0, screen_width-enemy_width), 'y': -enemy_height, 'hp': 400})
        # 적 전투기 생성 시간 갱신
        enemy_spawn_time = time.time()

    # 일정 시간마다 플레이어 위치에 총알 생성
    if time.time() - bullet_shot_time >= bullet_term:
        if item_states['upgrade_weapon']:
            bullets.append({'x':player_x + player_width/2 - bullet_width/2 - 20, 'y':player_y})
            bullets.append({'x':player_x + player_width/2 - bullet_width/2, 'y':player_y})
            bullets.append({'x':player_x + player_width/2 - bullet_width/2 + 20, 'y':player_y})
        else:
            bullets.append({'x':player_x + player_width/2 - bullet_width/2, 'y':player_y})
        # 총알 생성 시간 갱신
        bullet_shot_time = time.time()
        
    # 적 전투기 이동
    for enemy in enemies:
        # 적 전투기가 화면 밖으로 나가면 적 전투기 삭제
        if enemy['y'] > screen_height:
            enemies.remove(enemy)
        enemy['y'] += enemy_speed * df/1000
        
    # 총알 이동
    for bullet in bullets:
        # 총알이 화면 밖으로 나가면 총알 삭제
        if bullet['y'] < 0:
            bullets.remove(bullet)
        bullet['y'] -= bullet_speed * df/1000

    # 총알과 적 전투기 충돌 감지
    for enemy in enemies:
        for bullet in bullets:
            # 총알과 적 전투기가 충돌하면 적 전투기 체력 깎고 총알 제거
            if pygame.Rect(enemy['x'], enemy['y'], enemy_width, enemy_height).colliderect(bullet['x'], bullet['y'], bullet_width, bullet_height):
                enemy['hp'] -= 50
                bullets.remove(bullet)
                # 적 전투기의 체력이 0 이하라면 적 전투기 제거하기
                if enemy['hp'] <= 0:
                    if random.randint(1,100) <= 10:
                        items.append({'type': item_list[random.randint(0,2)], 'x': enemy['x'], 'y': enemy['y']})
                    if enemy in enemies:
                        enemies.remove(enemy)

    
    for item in items:
        item['y'] += item_speed * df/1000
        
        if pygame.Rect(player_x, player_y, player_width, player_height).colliderect(item['x'], item['y'], item_width, item_height):
            item_states[item['type']] = item_duration
            items.remove(item)
    
    if item_states['boom']:
        enemies = []
        item_states['boom'] = 0
    
    if item_states['speed_up']:
        player_speed = 1500
    else:
        player_speed = 900
    
    for item in item_list:
        if item_states[item]:
            item_states[item] -= df/1000
            if item_states[item] < 0:
                item_states[item] = 0
                
            
        
        
    
    # 배경 이동
    background_y += background_speed * df/1000
    
    # 배경 위로 올리기
    if background_y >= background_height:
        background_y = 0
        
    # 배경 그리기
    screen.blit(background_img, (0,background_y))
    screen.blit(background_img, (0,-background_height+background_y))
    
    # 적 전투기 그리기
    for enemy in enemies:  
        screen.blit(enemy_img, (enemy['x'], enemy['y']))
        
    # 총알 그리기
    for bullet in bullets:
        screen.blit(bullet_img, (bullet['x'], bullet['y']))
    
    # 아이템 그리기
    for item in items:
        screen.blit(item_img, (item['x'], item['y']))
    
    
    
    # 플레이어 그리기
    screen.blit(player_img, (player_x, player_y))

    # 화면 업데이트
    pygame.display.update()
# 코드 종료
pygame.quit()
