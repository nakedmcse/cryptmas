! Solution for cold war puzzle in FORTRAN
program solveColdWar
    implicit none
    character(len=:), allocatable :: part_1_hex, part_1_key, part_2_training_plain, part_2_training_hex, part_2_live_hex

    part_1_hex = 'b20eda95c375336f6c7beeacb2362adb80397d271d099de9f6449adbb33942271e09ace9f74497db8e397d2725f9eea8b201da9cc37733686c49ee98b209da95c34833556c411e1129d3482219afaaa5ef8d1e6c35c1494a57a8c3b3f58b7b7a36db584a47ace9bef28d7b6b2cd5462b5eacaeb8ee98707d37d92a243cc9b0a3fd8d77762cae2a435cbda6bb91957f7437dc00485fa8b0a4f59f777a23c043445dd3c3271d09a0e9f0449fdbb3394b272909a3e9ff44942bc34833626c43ee99b201daa9c3743369b68b716c36dd444c29c9aed8ff8b676936b4e88bb1c9aed8f3896d198014a82b52bba0bff58f7b1653ad3d32330b63559c8c707036b442265fa8aea2f4d36c7c24d1584e5daaa6cd9c9c781455ad273b21c4d2c39c3bbe9b42d7455b5aacb0cd9cea1edbe2362a4d5cbbaeb6e8e31e7f2bcc4f4f33beaab3e891347123da4e475aa7a4cd9c9d71192cdb5e2b57bcb3bbf59a7f6d27ba2a4f5cc9adb8e8f96a6b23da59465abdc3a2f2896c7636d1495f56adcdfdec987a7d2bda4d3133d99bc4fdd36d6c20de4f4847d3c3bef29a777d27da5e2b40bcaebafd8b671980149e2b50a6aebae997777a23c043445dbac3beee8b7b7e37d84b595abdbad79491716d27d8274752a4b6bf95d37f6c36dc455929c9af8392f96e1742d5616a7d86e9b3fd8d7b0342a5333c2ac4d3c591e80a3368db5c4e41bfaab2ebe3347d17e6636574c982d7cfac4e490eed2a6f7685828e90f97d490eba2a5c7a879792cef95a5c14fd6b7f768dc391ceb6531912e66568768d9685d9f7346d0afd792b778c959eddad57560cb4697976889792cff95f5742f1727b7f868a83ddbb525c42e66f67729d8a98d2aa565012b4686e679e8692d2f95f1901f57a7f669b8693b6ad4c580ce76762609a8a98d2f95f5706b46b2b78878c80d2f95d5812e07f79768dc383ceb857570bfa6d2b77868082d1bc504d4c9e004e45a0a7b2f29a7b0368c0626e338f8c9bd0b649500cf32a66729d8685d5b852190be72a627d8a8f82d8bc5a1907ec6b6867859ad7ddaa1e4b07f76579778c87d9b6d313144fb9274956aeaab99c8d6c782bda434554b6b3bbfd90706d27cc5e263ec4cedab68a716f2bd15e2b55a0a6bbf8f97f6c36dc2a584abab7b2f1f9111642c0584a5aa7aab9fbf96a6b23da59465abab0bef397346a36d55e425ca7d9d7f4966a7c2eb9464a5ebcabfdf8986a7c58b43b3224d0cec78ef40f0d68c44b4f57a0adb086f90e4151d500485ca7b7b2f28d043342b45e4356c9b2a2f59a751920c6455c5dc9a5b8e4f9746c2fc4592b5cbfa6a59c8d767c42d84b514ac9a7b8fbf7341942c24f595aafbad7ee9c7d7c2bc45e2533adacd7f2966a1930d15a474ac7e9cd869c707d58ae00263ec4cedaf9977a1936c64b425da0adb0e38972782bda5e4e4bbdceda91f4133368b927263ec4a1b2fb90701936c64b425da0adb0e39a77692ad1585f56b1b7a8f49c66144fb9272619d082c6ddbb0a5804a6326e2b8c87918be8070e00f03f6d768887c78fed0c0d57a03d3271d8d6cf8abf090807a6383c758ad7c589e00e5f57a6683a70d9dbc589ee5f5b04f0393a77d9d2c084e00b0107ac683c25dc80968bbd0e5f54a16c6f27dcd5ce8de15d5854a5386d76dbd691d8bc5b5c07f03a3825dc82938fea070d51a5393a27d0d7c28be15a0901a6323c25ddd49285e90f5854f63b3f2a8c80c6dae85f0f01f66e32708fd7918fee095a5bf66b3d71dad7c2dde9085c52f73f3b75ddd6c6dfbc095a04a16b3975d0d6cf8cef5b5a55ac3d3a2ad8d791ddbc0e0950ac3f38758882c78abc5f0a56f76f6f248adac285e90d015bf06c3c27dedac4daba5d0e07a33b3871da81ce89ba060b55a46e3222db85c7deeb0d5b56f23c6a728dd494d8e8065806a03d6926dbd79285b8075804f6333877d1da92d9eb5b5f03a36c3975db869188bd060d51f23a38208f8196daed0f5c01f2326977d0d392dfe85a0d5aa63f3f71ded7c788eb0a0e06ad3c6f27da87c08cbc5c0854a03b3f2488d4928def0a5f01f6383d708dd7c38de0095a57f66c382a8a80928bbb5d5f51a56f3e24d0d6c3daed0d0855a16b3820d080958dec5b0907f56f3820d8d5ce89b85b0007a5333e22d9829188e95d0e5bf0386972d086918bbc5f0f51a668332adedb96d9bd0a0e06f2326e25d9d293dae90c5b07f16b6d248bd4c2daee090a00a3393f718dd29688ec5b0100f6693924d8d6928abc5d5f54a03a6f2ad9d3938abb085f52f76e3272d0dac088bf060c04a1333d778880cf8aec5c0b5af1383277dcd5c0ddbf5b5b53f1386e75d8da95dae95f0e00f63c6e72dad4ce8fec5b0156a23a39778b80c1d8ed5b0f51a03b3c22db85c3daee0b0856f26e6f27dad2c08bbf5b0803f03e3822dbd5968eea085a01a13c3d208dd2c085eb5b0a5ba46f3c208bdb96d9eb585803a0686a76d98093dfe8095853a53b3d22d0d296d9eb065856f169392adfd6c38ceb5c0956a36e6a208dd7c68be85c5d57a6393d23d9d794d8e8085c55a2333c7788d5938de10d0b54f66b6a278ad695ddbc0a0f56a56c3d2bd082c6d8bb095d00a3696923d1dbc08cbc5d0d07a53f3c24d0dac384ba0b0004ad383323d1d091dee15a0957f53a3e24d1d6c688eb5b5a5aa13d3326d8db9284ba5c0b01f632322b8cdac28cbf580b57a43c3870dfdac6d8ee5f0907a4696a26ddd6c3deec0d0c57f53a392a8bd69488e85a0e04a66c3f22d0d6cfd8bb0a0e57a33d3c71ddd692ddbf5b5c50a2393921dad2cedeed0b5b04f26f3b268ad391d9e8070f50f16f6f77df81c18bbc0e0b51f0396970dad495dfe9065f5aa23f6826d0d4c5deee5d0b5af73e392ad9d5cf88b8585d53a2396f27da86c2dfea090007ad3f3e26ddd4c68fec095d52ad3a3b778f8796deed5d5d51f6386e76dddac0d8d313144fb9274e5dadc3a3ee9877772bda4d5450a0b3bff98b6a7c3ac0554356b1ceda91f4133368b927263ec4a1b2fb9070192edd5c4e4caaaaa7f49c6c6d27cc5e545bacbbda91f4131468ad6b3a728bd796daeb065c5af16e6d24d8dac0debd0b5f07f56e3b20ddd1c389ed090000a53f33258fd4c6d9eb0c0e04f73e3926d0d39189ea0e0807a4693876ded6968ebd0a0857a26c3d77d18192dae00f0e55a13a6a238dd39284ec585a5aa0686f21d0d395dfec075f5ba7326d208fd7ced8bb580a52a66c6a24dad7c38cef5f0806ad333824d0d7c789ef580f55a06f6924d9d393d8ba0b0a06f16c3b2bd8d1c084bb5f0055f23e6d21ded292d9bd5c0807a36b3f76d98692ddba080e01a6683d7188d693dfeb5c0c06f13f3376db82948fe00e0807a46c322188d0c08abf5d0c53f7383b72d1d4c584bd5b5d03f7393e20ded4cfd9e1090f04a369382388d1c1deee0d0b03a06c33718dd1c484ef095c50a0693827d8da93dae10a5d06f56e6a26d9829288ef0b0152a568682188d4928dbb0b0a57f1336923dd81ce88ee5a0c52a33c32778b86c385e00b0b50f1696a2adcd3cf89e10e5806f23b6e70d8d4c384ec0f0b57a2333a26dcd3c0d8e00c5a03a6383d27d180c384ec0c0d55f7386f27d9d2ce8ebd58085bf63b3b758ad7ce8ebc0e0c01f53c32708ad1ce8aed5a0807f23a3827dbd5c3d9e90f0e00f7396e76d8d5c1debd0f0d55a2326e258d82928fee5d0954a1336977ddd1c58ee10d5c57ac3f69238d82c085ea0f5f53a53d682588d3c18be10d0003a26c6a23df829688e10c015af7693922d9d7c3dae95b0c04f13b6a27dc869188ba060c5ba53f6e258c80918aed0e5d5ba43a6f258bd5918cba5a0003ad333c278fdbc2daec070f06f5693325dc81c584bc0c0006a13c3c728f86958dbc0c5c04a5336975d982c0debb085c03a73d3220dc86cf88ef0e0b06f6693d77dd86c18fed0f0e53a66c3f75ded6c688bf5a5d56a73b3c248f86c6ddbd0a0a53a63c6a21dad594dfec080f51f03b3c2adb86c485e95b0e51f6326a76db8596dded5c5807a4696f70d8d4968de80f0f53ad3b6a76dbdb9688bc5d0b5ba23f3f23db81c788ee5a5851f03e3a24d8819389eb0d0f52a43e6877d8d5928bef070e06f53c6f22d1d0c58abb5f5856f73f69728cd7c188e8580f5aad6b3a778bd493deee5d5b52ac323c238c80c3d9e80b0e55ad333f2b8ad6cedae00c0152ac396d71d187c789b80e0c55ac3f3a27db869484ec090157a5326e2b8a81c5dfbb06005af1333e238f85c589e9080a01a2333a77de82c7d9e95d5857a03f3f71dcd0c289b80e0b5bf63f6827d887c0daeb580d53ad3f33778bd7c089ee090e00a03f6e728f86928eef0d0b50a73b3271ddd695dabf5b0957f73a6d76d8dac18ebc5b5d06a2683d248cd3c58fbd0d5b01a73d6970d9db9184ef0b5a57ad3d3971de80c584ba0a0b5ba43c33278885938def0d5d56a76f3e70dad4ced9e00b0c57a03d3a20dcd4938ce00e0906f26e6a71dd80938fbb0c5c07a0333c77e3ceda91f4137c2cd02a475abfa6a8ff906e7127c65e4e4bbdbcbff98113144fb9270119a8b0a4f98a6d7427da5e3119a085d7ddb71e5806e26f796088918e9cab5b5a0de26f7960c9979fd5aa1e4b07e4657967c5c383d4bc1e5a0dfa7e6e7d9d90d7ddbb514f07b46b7976c99082dabf575a0bf1647f339d8cd7cebc5d560ce77e79668a97fdc8b15b190de46f79729d8a98d2b8521916e66b6560848a84cfb051574c9e004e5dadc3b8faf9737c2fdb584a5dadb6bab6'
    part_1_key = 'КОМИТЕТ ГОСУДАРСТВЕННОЙ БЕЗОПАСНОСТИ (KGB)'
    call solve_part_1(part_1_hex, part_1_key)

    part_2_training_plain = "SOVIET FIELD AUTH SYSTEM // TRAINING TRANSMISSION" // new_line('a') // &
                    "STATION: HOTEL-LAMUH" // new_line('a') // &
                    "DATE: 1979-02-14" // new_line('a') // &
                    "PADDING: 0x3A" // new_line('a') // &
                    "CONTENT:" // new_line('a') // &
                    "  THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG." // new_line('a') // &
                    "  VERIFY RECEIPT. DO NOT REPLY." // new_line('a') // &
                    "::END::"
    part_2_training_hex = '9a1ab4af28e8edf7197bd5fead034245479b1586f71e227fc42590f52b1c08257abfd31d0178958e8b765ca7d0f65fd456918ca612fe25fdeeeed0365ad33943131494578d0c287647e901a6b149ec1f1a6cbd9cf4f377c9ba6b345a06e0c50f451ce7cf5a2f95806ec7871914fae002853faa06ea34ced7c9590389df74793fcc7e713b3b95c8270d912f0b23b4f6aad7cd18ad47b524e9a9afb93d89ee2efa7f2f2ef4d843f033fbaf41ecf8bd90ec1d48254b7404247d96d43d70eb164147a7e164fcb26cd44197c5bf39cce7bcf31e57954f43175a339cb15e0eae331695ae9e19510af40c79d2ba9ef7ea632b8978aed47df8e601df02beeaf7b75f773b734bd1a45e8bbc2715e6ecf640d900d6b6f0cd9a9974f85f596dac865b28e29d567afeb1e2ef19bf0a7bb6ea37935e84602dbc6d4e6341712f4f7514fdd43177fe1ad43126a236cc5663d1792e390e73b8ae2faa4bae0cdc17a1116191ae28a4ec2965402b047da3d4171bd5236004cd16e7697da6d18326baa4c5bae4641f689a1db7db7cb08870ec4e15779948c59f928083fb8d05a05785142ec8578518e8cb2cb898e950ff25063c691d7a0e0ca5454b5355a029b5c41d7f2f41958db475777b45eafee26322319b45bffe05c0fe1962eedd6b67e023d3bc37bc08f865c5972b7c28c4290684afd163d43e5c379e9555471357d0900dfdab4cd3b2ee497d'
    part_2_live_hex = '9a1ab4af28e8edf7197bd5fead034245479b1586f71e227fc42590f5301e0c3e75a2d4156f6d8bef917750a0d0e85fc84bd290bc59f938f3f49dbf302fa734406a1d993794056f674eb700ddc53def081278ba97f4f271eedb1e7a4e0eeac67c2b6ba5dc2b5de58e2ac3901e0f92a376fc51c20a8728dedac353778e876f7c30a26b732a4f8bd23867e24c3419df84ddada50ae465801bc2a7e1b535e9b04b947d50769dbe499522eca9508580adf1ec174851256915507d92ca22648c485247c2d40192df19b10fc492e05ca69cc2964d1ef034264e017bc3ee166bd14768e6dae37c0659bd422283e585b0da7931f117c6a067839a6fa06aa48288cc21044f0e5fe1a45ef4c85915e6ecf640d900d6b6f0cd9a9974f85f596dac865b28e29d567afeb1e2ef19bf0a7bb6ea37935e84602dbc6d4e6341712f4f7514fdd43177fe1ad43126a236cc5663d1792e390e73b8ae2faa4bae0cdc17a1116191ae28a4ec2965402b047da3d4171bd5236004cd16e7697da6d18326baa4c5bae4641f689a1db7db7cb08870ec4e15779948c59f928083fb8d05a05785142ec8578518e8cb2cb898e950ff25063c691d7a0e0ca5454b5355a029b5c41d7f2f41958db475777b45eafee26322319b45bffe05c0fe1962eedd6b67e023d3bc37bc08f865c5972b7c28c4290684afd163d43e5c379e9555471357d0900dfdab4cd3b2ee497d'
    call solve_part_2(part_2_training_plain, part_2_training_hex, part_2_live_hex)

    contains
        function HexToBytes(hex) result (res)
            character(len=*) :: hex
            character(len=len(hex)/2) :: res
            integer :: i, j, x

            do i = 2, len(hex), 2
                j = i/2
                read(hex(i-1:i),'(Z2)') x
                res(j:j) = achar(x)
            end do
        end function HexToBytes

        function XorKeystream(data, key) result (res)
            character(len=*) :: data, key
            integer :: i, j, d, k
            character(len=len(data)) :: res

            do i=1, len(data)
                d = ichar(data(i:i))
                j = mod(i-1, len(key)) + 1
                k = ichar(key(j:j))
                res(i:i) = achar(ieor(d,k))
            end do
        end function XorKeystream

        subroutine solve_part_1(cipher_hex, key)
            character(len=*) :: cipher_hex, key
            character(len=len(cipher_hex)/2) :: cipher_bytes
            character(len=12) :: recovered_key
            integer :: i, c, k

            cipher_bytes = HexToBytes(cipher_hex)
            do i=1, 12
                c = ichar(cipher_bytes(i:i))
                k = ichar(key(i:i))
                recovered_key(i:i) = achar(ieor(c,k))
            end do
            print *, "Part 1 Solution:"
            print *, XorKeystream(cipher_bytes, recovered_key)
            print *, ""
        end subroutine solve_part_1

        subroutine solve_part_2(training_plain, training_hex, live_hex)
            character(len=*) :: training_plain, training_hex, live_hex
            character(len=len(live_hex)/2) :: padded_plain, training_bytes, live_bytes, key
            integer :: i, c, k

            live_bytes = HexToBytes(live_hex)
            training_bytes = HexToBytes(training_hex)
            padded_plain = training_plain
            ! Pad plain text to training bytes size with 0x3a
            do i=len(training_plain)+1, len(padded_plain)
                padded_plain(i:i) = achar(int(Z'3A'))
            end do
            ! Recover key from training data
            do i=1, len(training_bytes)
                c = ichar(padded_plain(i:i))
                k = ichar(training_bytes(i:i))
                key(i:i) = achar(ieor(c,k))
            end do
            print *, "Part 2 Solution:"
            print *, XorKeystream(live_bytes, key)
        end subroutine solve_part_2
end program solveColdWar